import { effect, Injectable, Signal, signal } from '@angular/core';
import { MenuItem } from '../../models';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  readonly #menuItems = signal<MenuItem[]>([]);
  readonly #selectedItem = signal<string | undefined>(undefined);
  readonly #expandedItems = signal<Set<string>>(new Set());
  readonly #checkedItems = signal<Set<string>>(new Set());
  readonly #autoCollapse = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.#autoCollapse()) {
        const selectedItem = this.selectedItem();
        this.#expandedItems.set(selectedItem ? this.#findAncestors(selectedItem) : new Set());
      }
    });
  }

  get menuItems(): Signal<MenuItem[]> {
    return this.#menuItems.asReadonly();
  }

  set menuItems(items: MenuItem[]) {
    this.#menuItems.set(items);
  }

  get selectedItem(): Signal<string | undefined> {
    return this.#selectedItem.asReadonly();
  }

  set selectedItem(id: string) {
    this.#selectedItem.set(id);
  }

  get expandedItems(): Signal<Set<string>> {
    return this.#expandedItems.asReadonly();
  }

  set expandedItems(ids: Set<string>) {
    this.#expandedItems.set(ids);
  }

  get checkedItems(): Signal<Set<string>> {
    return this.#checkedItems.asReadonly();
  }

  set checkedItems(ids: Set<string>) {
    this.#checkedItems.set(ids);
  }

  set autoCollapse(enabled: boolean) {
    this.#autoCollapse.set(enabled);
  }

  expandItem(id: string): void {
    if (this.#autoCollapse()) {
      this.#expandedItems.set(this.#findAncestors(id));
      return;
    }
    this.#expandedItems.update((items) => {
      items.add(id);
      return new Set(items);
    });
  }

  collapseItem(id: string): void {
    this.#expandedItems.update((items) => {
      items.delete(id);
      return new Set(items);
    });
  }

  checkItem(id: string): void {
    this.#checkedItems.update((items) => {
      items.add(id);
      return new Set(items);
    });
  }

  uncheckItem(id: string): void {
    this.#checkedItems.update((items) => {
      items.delete(id);
      return new Set(items);
    });
  }

  #findAncestors(id: string): Set<string> {
    return recursivelyFindAncestors(this.#menuItems(), id) ?? new Set();
  }
}

function recursivelyFindAncestors(items: MenuItem[], id: string): Set<string> | undefined {
  for (const item of items) {
    if (item.id === id) {
      return new Set([item.id]);
    }
    if (item.type === 'submenu') {
      const foundAncestors = recursivelyFindAncestors(item.children, id);
      if (foundAncestors) {
        foundAncestors.add(item.id);
        return foundAncestors;
      }
    }
  }
  return undefined;
}
