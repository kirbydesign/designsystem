import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of, combineLatest, Subscription } from 'rxjs';
import { map, first, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { environment } from '~/environments/environment';

import {
  ComponentStatusItem,
  ItemCodeStatusOrder,
  ItemUXStatus,
  ItemCodeStatus,
} from './component-status-items';

export interface GhostComponent {
  name: string;
  tagline: string;
  url: string;
}

@Component({
  selector: 'kirby-component-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss'],
})
export class ComponentStatusComponent implements OnInit, OnDestroy {
  isLoading = true;
  gitHubError = false;
  items: ComponentStatusItem[];
  ghostItems: GhostComponent[];
  sortedItems: ComponentStatusItem[] = [];
  items$: Observable<ComponentStatusItem[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  uxStatusEnum = ItemUXStatus;
  codeStatusEnum = ItemCodeStatus;
  excludedStatuses: ItemCodeStatus[] = [];
  newIssueUrl =
    environment.githubBaseUrl +
    '/issues/new?labels=component&template=component-request.md&title=%5BCOMPONENT%5D+';

  firebaseSubscription: Subscription;

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  ngOnInit() {
    this.items$ = this.searchTerm$.pipe(
      map((searchTerm) => this.filterItems(this.sortedItems, searchTerm, this.excludedStatuses))
    );
    this.connectFirebase();
  }

  private connectFirebase(): void {
    const componentsCollection$ = this.db
      .collection<ComponentStatusItem>('component-status-items')
      .valueChanges();

    const ghostComponentsCollection$ = this.db
      .collection<GhostComponent>('component-status-ghost-items')
      .valueChanges();

    this.firebaseSubscription = combineLatest([
      componentsCollection$,
      ghostComponentsCollection$,
    ]).subscribe(([components, ghostComponents]) => {
      this.isLoading = true;
      this.items = components;
      this.ghostItems = ghostComponents;
      this.initializeGithubStatus();
    });
  }

  ngOnDestroy(): void {
    this.firebaseSubscription.unsubscribe();
  }

  public toggleExcluded(event) {
    const checked = event.detail.checked;
    const excludedStatuses = event.detail.value as ItemCodeStatus[];
    this.excludedStatuses = checked ? excludedStatuses : [];
    this.searchTerm$.next(this.searchTerm$.value);
  }

  private initializeGithubStatus() {
    Promise.all([
      this.loadGithubComponentRequests(),
      this.loadGithubComponentEnhancementRequests(),
    ]).then((_) => {
      this.setCurrentGithubStatus().then((_) => {
        this.sortedItems = this.sortItems(this.items);
        this.isLoading = false;
      });
    });
  }

  private loadGithubComponentRequests() {
    return new Promise((resolve) => {
      this.getStatusItemsFromGithubIssues()
        .pipe(first())
        .subscribe((githubItems) => {
          this.items = this.items.concat(githubItems);
          resolve();
        });
    });
  }

  private loadGithubComponentEnhancementRequests() {
    return new Promise((resolve) => {
      this.getEnhancementItemsFromGithubIssues()
        .pipe(first())
        .subscribe((enhancementItems) => {
          const flattenedItems = this.flattenItems(this.items);
          enhancementItems.forEach((enhancementItem) => {
            flattenedItems
              .filter((item) => item.code && item.title === enhancementItem.parentTitle)
              .forEach((item) => {
                if (!item.code.enhancements) {
                  item.code.enhancements = [enhancementItem];
                } else {
                  item.code.enhancements.push(enhancementItem);
                }
              });
          });
          resolve();
        });
    });
  }

  private getStatusItemsFromGithubIssues() {
    const flattenedItems = this.flattenItems(this.items);

    const hasStatusItem = (issue) =>
      !!flattenedItems.find((item) => item.code.githubIssueNo === issue.number);

    return this.getGithubComponentIssues().pipe(
      map((issues) => {
        return issues
          .filter((issue) => !hasStatusItem(issue))
          .filter((issue) => this.hasComponentTitleLabel(issue))
          .map((issue) => this.mapGithubIssueToStatusItem(issue));
      })
    );
  }

  private getEnhancementItemsFromGithubIssues() {
    return this.getGithubEnhancementIssues().pipe(
      map((issues) => {
        return issues
          .filter((issue) => this.hasComponentTitleLabel(issue))
          .map((issue) => this.mapGithubIssueToStatusItem(issue));
      })
    );
  }

  private mapGithubIssueToStatusItem(issue: any): ComponentStatusItem {
    const zeplinUrl = this.getZeplinUrl(issue);
    const sketchUrl = this.getSketchUrl(issue);
    const uxStatus = zeplinUrl ? ItemUXStatus.inProgress : ItemUXStatus.underConsideration;
    const componentTitle = this.getComponentTitle(issue);
    const githubIssueTitle = issue.title.replace('[Enhancement] ', '');
    const isEnhancement = issue.labels.find((label) => label.name.indexOf('enhancement') > -1);
    return {
      title: isEnhancement ? githubIssueTitle : componentTitle,
      parentTitle: isEnhancement ? componentTitle : null,
      priority: 0,
      ux: {
        status: uxStatus,
        wireFrameUrl: zeplinUrl || sketchUrl,
      },
      code: {
        status: ItemCodeStatus.underConsideration,
        githubIssueNo: issue.number,
      },
    };
  }

  private getComponentTitle(issue: { labels: any[] }): string {
    const componentTitleLabel = this.getComponentTitleLabel(issue);
    return componentTitleLabel.name.split('component:')[1];
  }

  private hasComponentTitleLabel(issue: { labels: any[] }) {
    return !!this.getComponentTitleLabel(issue);
  }

  private getComponentTitleLabel(issue: { labels: any[] }) {
    return issue.labels.find((label) => {
      return label.name.indexOf('component:') > -1;
    });
  }

  private getZeplinUrl(issue: { body: string }): string {
    const matches = issue.body.match(
      /https:\/\/(app\.zeplin|zpl)\.io\/(project\/[a-z,0-9]{24}\/screen\/[a-z,0-9]{24}|[a-z,0-9]{7})/i
    );
    const url = matches ? matches[0] : null;
    return url;
  }

  private getSketchUrl(issue: { body: string }): string {
    const matches = issue.body.match(
      /https:\/\/sketch\.cloud\/s\/[a-z,0-9]{5}\/[a-z,0-9]{7}(\/play)?/i
    );
    const url = matches ? matches[0] : null;
    return url;
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
        // Don't sort by priority when ready:
        if (a.code.status != ItemCodeStatus.ready || b.code.status != ItemCodeStatus.ready) {
          order = this.sortByPriority(a, b);
        }
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
    return a.title.localeCompare(b.title);
  }

  private filterItems(
    items: ComponentStatusItem[],
    searchTerm: string,
    excludedStatuses: ItemCodeStatus[]
  ): ComponentStatusItem[] {
    const regex = new RegExp(searchTerm, 'i');
    return items
      .filter((item) => {
        return this.isIncluded(item, excludedStatuses) && this.matchItem(item, regex);
      })
      .concat(this.getGhostItems(searchTerm));
  }

  private isIncluded(item: ComponentStatusItem, excludedStatuses: ItemCodeStatus[]) {
    return (
      !this.isExcluded(item, excludedStatuses) ||
      this.hasIncludedEnhancement(item, excludedStatuses)
    );
  }

  private isExcluded(item: ComponentStatusItem, excludedStatuses: ItemCodeStatus[]) {
    return excludedStatuses.includes(item.code.status as ItemCodeStatus);
  }

  private hasIncludedEnhancement(item: ComponentStatusItem, excludedStatuses: ItemCodeStatus[]) {
    return (
      item.code.enhancements &&
      item.code.enhancements.find((enhancement) => !this.isExcluded(enhancement, excludedStatuses))
    );
  }

  private matchItem(item: ComponentStatusItem, searchTerm: RegExp): boolean {
    return (
      searchTerm.test(item.title) ||
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
    const ghostItem = this.ghostItems.find(
      (x) => x.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (ghostItem) {
      return [
        {
          title: ghostItem.tagline,
          priority: 0,
          ux: {
            version: 999,
            status: ItemUXStatus.ready,
            wireFrameUrl: ghostItem.url || null,
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

  private getGithubComponentIssues() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
      }),
    };
    const url = environment.githubApi + '/repos/kirbydesign/designsystem/issues?labels=component';
    return this.http.get<any[]>(url, options);
  }

  private getGithubEnhancementIssues() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
      }),
    };
    const url = environment.githubApi + '/repos/kirbydesign/designsystem/issues?labels=enhancement';
    return this.http.get<any[]>(url, options);
  }

  private setCurrentGithubStatus() {
    return new Promise((resolve) => {
      this.getGithubProjectStatus()
        .pipe(first())
        .subscribe((issues) => {
          const flattenedItems = this.flattenItems(this.items);
          issues.forEach((issue) => {
            flattenedItems
              .filter((item) => item.code.githubIssueNo === issue.number)
              .forEach((item) => (item.code.status = issue.status));
          });
          resolve();
        });
    });
  }

  private flattenItems(items: ComponentStatusItem[]): ComponentStatusItem[] {
    const concat = (x, y) => x.concat(y);
    const flatMap = (arr, f) => arr.map(f).reduce(concat, []);
    return flatMap(items, (item) => [
      item,
      ...(item.children ? this.flattenItems(item.children) : []),
      ...(item.code && item.code.enhancements ? item.code.enhancements : []),
    ]);
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
