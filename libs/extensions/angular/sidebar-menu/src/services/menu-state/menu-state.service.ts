import { Injectable, Signal, signal } from '@angular/core';

import { SidebarMenuItem } from '../../models';

@Injectable({ providedIn: 'root' })
export class MenuStateService<T extends SidebarMenuItem> {
  readonly #toggledSubmenu = signal<T | undefined>(undefined);
  readonly #selectedItem = signal<T | undefined>(undefined);
  readonly #checkedItem = signal<{ id: string; checked: boolean } | undefined>(undefined);

  get toggledSubmenu(): Signal<T | undefined> {
    return this.#toggledSubmenu;
  }

  set toggledSubmenu(item: T) {
    this.#toggledSubmenu.set(item);
  }

  get selectedItem(): Signal<T | undefined> {
    return this.#selectedItem;
  }

  set selectedItem(item: T) {
    if (item.selectable ?? true) {
      this.#selectedItem.set(item);
    }
  }

  get checkedItem(): Signal<{ id: string; checked: boolean } | undefined> {
    return this.#checkedItem.asReadonly();
  }

  setCheckedItem(id: string, checked: boolean) {
    this.#checkedItem.set({ id, checked });
  }
}
