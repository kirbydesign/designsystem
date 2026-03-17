import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CheckEvent, ExpandEvent, ReorderEvent, SidebarMenuItem } from '../../models';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  readonly #menuItems = signal<SidebarMenuItem[]>([]);
  readonly #selectedItem = signal<string | undefined>(undefined);
  readonly #expandedItems = signal<Set<string>>(new Set());
  readonly #checkedItems = signal<Set<string>>(new Set());
  readonly #autoCollapse = signal<boolean>(false);
  readonly #animationsDisabled = signal<boolean>(false);
  readonly #expandEvents = new Subject<ExpandEvent>();
  readonly #checkEvents = new Subject<CheckEvent>();
  readonly #reorderEvents = new Subject<ReorderEvent>();
  readonly #selectEvents = new Subject<string>();

  get menuItems(): Signal<SidebarMenuItem[]> {
    return this.#menuItems.asReadonly();
  }

  set menuItems(items: SidebarMenuItem[]) {
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

  get animationsDisabled(): Signal<boolean> {
    return this.#animationsDisabled.asReadonly();
  }

  set animationsDisabled(disabled: boolean) {
    this.#animationsDisabled.set(disabled);
  }

  get expandEvents(): Observable<ExpandEvent> {
    return this.#expandEvents.asObservable();
  }

  get checkEvents(): Observable<CheckEvent> {
    return this.#checkEvents.asObservable();
  }

  get reorderEvents(): Observable<ReorderEvent> {
    return this.#reorderEvents.asObservable();
  }

  get selectEvents(): Observable<string> {
    return this.#selectEvents.asObservable();
  }

  expandItem(id: string): void {
    this.#expandEvents.next({ id, isExpanded: true });
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
    this.#expandEvents.next({ id, isExpanded: false });
    this.#expandedItems.update((items) => {
      items.delete(id);
      return new Set(items);
    });
  }

  checkItem(id: string): void {
    this.#checkEvents.next({ id, isChecked: true });
    this.#checkedItems.update((items) => {
      items.add(id);
      return new Set(items);
    });
  }

  uncheckItem(id: string): void {
    this.#checkEvents.next({ id, isChecked: false });
    this.#checkedItems.update((items) => {
      items.delete(id);
      return new Set(items);
    });
  }

  selectItem(id: string): void {
    this.#selectEvents.next(id);
    this.#selectedItem.set(id);
  }

  #findAncestors(id: string): Set<string> {
    return recursivelyFindAncestors(this.#menuItems(), id) ?? new Set();
  }

  reorderItems(menuItems: SidebarMenuItem[], reorderEvent: ReorderEvent): void {
    moveItemInArray(menuItems, reorderEvent.previousIndex, reorderEvent.newIndex);
    this.#reorderEvents.next(reorderEvent);
    this.#menuItems.update((items) => [...items]);
  }
}

function recursivelyFindAncestors(items: SidebarMenuItem[], id: string): Set<string> | undefined {
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
