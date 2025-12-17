import { Injectable, Signal, signal } from '@angular/core';

import { CheckEvent, SidebarMenuItem } from '../../models';

@Injectable({ providedIn: 'root' })
export class MenuStateService<T extends SidebarMenuItem> {
  readonly #toggledSubmenu = signal<T | undefined>(undefined);
  readonly #selectedItem = signal<T | undefined>(undefined);
  readonly #checkEvent = signal<CheckEvent<T> | undefined>(undefined);

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

  get checkEvent(): Signal<CheckEvent<T> | undefined> {
    return this.#checkEvent.asReadonly();
  }

  set checkEvent(event: CheckEvent<T>) {
    this.#checkEvent.set(event);
  }
}
