import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { map, first, catchError } from 'rxjs/operators';

import { environment } from '~/environments/environment';

import {
  componentStatusItems,
  ComponentStatusItem,
  ItemCodeStatusOrder,
  ItemUXStatus,
  ItemCodeStatus,
} from './component-status-items';
import { componentStatusGhostItems } from './component-status-ghost-items';
@Component({
  selector: 'kirby-component-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss'],
})
export class ComponentStatusComponent implements OnInit {
  isLoading = true;
  gitHubError = false;
  sortedItems: ComponentStatusItem[];
  items$: Observable<ComponentStatusItem[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  uxStatusEnum = ItemUXStatus;
  codeStatusEnum = ItemCodeStatus;
  newIssueUrl =
    environment.githubBaseUrl +
    '/issues/new?labels=component&template=component-request.md&title=%5BCOMPONENT%5D+';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sortedItems = this.sortItems(componentStatusItems);
    this.items$ = this.searchTerm$.pipe(
      map((searchTerm) => this.filterItems(this.sortedItems, searchTerm))
    );
    this.getCurrentGithubStatus(this.sortedItems);
  }

  public isUnderConsiderationOrNotPlanned(item: ComponentStatusItem) {
    return (
      (item.ux.status === ItemUXStatus.underConsideration ||
        item.ux.status === ItemUXStatus.notCurrentlyPlanned) &&
      (item.code.status === ItemCodeStatus.underConsideration ||
        item.code.status === ItemCodeStatus.notCurrentlyPlanned)
    );
  }

  public getGithubIssueUrl(githubIssueNo: number) {
    return environment.githubBaseUrl + '/issues/' + githubIssueNo;
  }

  private sortItems(items: ComponentStatusItem[]) {
    return items.sort((a: ComponentStatusItem, b: ComponentStatusItem) => {
      let order = this.sortByStatus(a, b);
      if (order === 0) {
        order = this.sortByPriority(a, b);
        if (order === 0) {
          order = this.sortByComponentName(a, b);
        }
      }
      return order;
    });
  }

  private sortByStatus(a: ComponentStatusItem, b: ComponentStatusItem) {
    return ItemCodeStatusOrder[a.code.status] - ItemCodeStatusOrder[b.code.status];
  }

  private sortByPriority(a: ComponentStatusItem, b: ComponentStatusItem) {
    // Items with priority = 0 are sorted after items with priority > 0:
    if (a.priority === 0) {
      return b.priority;
    }
    if (b.priority === 0) {
      return -a.priority;
    }
    return a.priority - b.priority;
  }

  private sortByComponentName(a: ComponentStatusItem, b: ComponentStatusItem) {
    if (a.component < b.component) {
      return -1;
    }
    if (a.component > b.component) {
      return 1;
    }
    return 0;
  }

  private filterItems(items: ComponentStatusItem[], searchTerm: string): ComponentStatusItem[] {
    const regex = new RegExp(searchTerm, 'i');
    return items
      .filter((item) => this.matchItem(item, regex))
      .concat(this.getGhostItems(searchTerm));
  }

  private matchItem(item: ComponentStatusItem, searchTerm: RegExp): boolean {
    return (
      searchTerm.test(item.component) ||
      this.matchAliases(item.aliases, searchTerm) ||
      this.matchChildComponents(item.children, searchTerm)
    );
  }

  private matchAliases(aliases: string[], searchTerm: RegExp): boolean {
    if (Array.isArray(aliases)) {
      return aliases.some((alias) => searchTerm.test(alias));
    }
    return false;
  }

  private matchChildComponents(children: ComponentStatusItem[], searchTerm: RegExp): boolean {
    if (Array.isArray(children)) {
      return children.filter((item) => this.matchItem(item, searchTerm)).length > 0;
    }
    return false;
  }

  private getGhostItems(searchTerm: string): ComponentStatusItem[] {
    const ghostItem = componentStatusGhostItems.find(
      (x) => x.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (ghostItem) {
      return [
        {
          component: ghostItem.tagline,
          priority: 0,
          ux: {
            version: 999,
            status: ItemUXStatus.ready,
            zeplinUrl: ghostItem.url || null,
          },
          code: {
            version: 999,
            status: ItemCodeStatus.ready,
          },
        },
      ];
    }
    return [];
  }

  private getGithubIssues() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
      }),
    };
    const url = environment.githubApi + '/repos/kirbydesign/designsystem/issues?labels=component';
    return this.http.get(url, options);
  }

  private getCurrentGithubStatus(items: ComponentStatusItem[]) {
    const flattenedItems = this.flattenItems(items);
    console.time('Get Github Status');
    this.getGithubProjectStatus()
      .pipe(first())
      .subscribe((issues) => {
        issues.forEach((issue) => {
          flattenedItems
            .filter((item) => item.code.githubIssueNo === issue.number)
            .forEach((item) => {
              item.code.status = issue.status;
              item.code.livestatus = true;
            });
        });
        console.timeEnd('Get Github Status');
        this.sortedItems = this.sortItems(componentStatusItems);
        this.searchTerm$.next(this.searchTerm$.value);
        this.isLoading = false;
      });
  }

  private flattenItems(items: ComponentStatusItem[]) {
    const concat = (x, y) => x.concat(y);
    const flatMap = (arr, f) => arr.map(f).reduce(concat, []);
    return flatMap(items, (item) => [item, ...(item.children ? item.children : [])]);
  }

  private getGithubProjectCards(columnId: number, status: ItemCodeStatus) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
        Accept: 'application/vnd.github.inertia-preview+json',
      }),
    };
    const url = environment.githubApi + '/projects/columns/' + columnId + '/cards';
    return this.http.get<GithubCard[]>(url, options).pipe(
      catchError((_) => {
        this.gitHubError = true;
        this.isLoading = false;
        return of([] as GithubCard[]);
      }),
      map((cards) => this.mapGithubCardsToIssues(status, cards))
    );
  }

  private mapGithubCardsToIssues(status: ItemCodeStatus, cards: GithubCard[]): GithubIssue[] {
    return cards.map((card) => {
      let githubIssueNo = 0;
      const matches = card.content_url.match(/issues\/(\d+)$/);
      if (matches.length === 2) {
        githubIssueNo = +matches[1];
      }
      return <GithubIssue>{
        number: githubIssueNo,
        status,
      };
    });
  }

  private getGithubProjectStatus() {
    const todoColumnId = 4590936;
    const inProgressColumnId = 4590937;
    const doneColumnId = 4590938;
    return forkJoin(
      this.getGithubProjectCards(todoColumnId, ItemCodeStatus.planned),
      this.getGithubProjectCards(inProgressColumnId, ItemCodeStatus.inProgress),
      this.getGithubProjectCards(doneColumnId, ItemCodeStatus.ready)
    ).pipe(
      map(([cards1, cards2, cards3]) => {
        return [...cards1, ...cards2, ...cards3];
      })
    );
  }
}

interface GithubCard {
  content_url: string;
}
interface GithubIssue {
  number: number;
  status: ItemCodeStatus;
}
