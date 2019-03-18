import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { componentStatusItems, ComponentStatusItem } from './component-status-items';
@Component({
  selector: 'kirby-component-status',
  templateUrl: './component-status.component.html',
  styleUrls: ['./component-status.component.scss'],
})
export class ComponentStatusComponent implements OnInit {
  items$: Observable<ComponentStatusItem[]>;
  searchTerm$ = new BehaviorSubject<string>('');

  constructor() {}

  ngOnInit() {
    this.items$ = this.searchTerm$.pipe(
      map((searchTerm) => this.filterItems(componentStatusItems, searchTerm))
    );
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
