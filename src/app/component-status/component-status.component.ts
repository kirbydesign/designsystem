import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  componentStatusItems,
  ComponentStatusItem,
  ItemCodeStatusOrder,
  ItemUXStatus,
  ItemCodeStatus,
} from './component-status-items';
@Component({
  selector: 'kirby-component-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss'],
})
export class ComponentStatusComponent implements OnInit {
  sortedItems: ComponentStatusItem[];
  items$: Observable<ComponentStatusItem[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  uxStatusEnum = ItemUXStatus;
  codeStatusEnum = ItemCodeStatus;

  constructor() {}

  ngOnInit() {
    this.sortedItems = componentStatusItems.sort(
      (a: ComponentStatusItem, b: ComponentStatusItem) => {
        let order = this.sortByStatus(a, b);
        if (order === 0) {
          order = this.sortByPriority(a, b);
          if (order === 0) {
            order = this.sortByComponentName(a, b);
          }
        }
        return order;
      }
    );
    this.items$ = this.searchTerm$.pipe(
      map((searchTerm) => this.filterItems(this.sortedItems, searchTerm))
    );
  }

  public isUnderConsiderationOrNotPlanned(item: ComponentStatusItem) {
    return (
      (item.ux.status === ItemUXStatus.underConsideration ||
        item.ux.status === ItemUXStatus.notCurrentlyPlanned) &&
      (item.code.status === ItemCodeStatus.underConsideration ||
        item.code.status === ItemCodeStatus.notCurrentlyPlanned)
    );
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
    return items.filter((item) => this.matchItem(item, regex));
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
}
