import { Component, effect, inject, input, model, output, Signal } from '@angular/core';
import { MenuContainerComponent } from '../menu-container';
import { HeightObserverDirective } from '../../directives/height-observer';
import { selectMenuItem } from '../../functions/select-menu-item';
import { toggleSubmenu } from '../../functions/toggle-submenu';
import { toggleSubmenuAutoCollapsed } from '../../functions/toggle-submenu-auto-collapsed';
import { CheckEvent, SidebarMenuItem } from '../../models';
import { MenuStateService } from '../../services/menu-state';
import { SidebarService } from '../../services/sidebar';
import { checkMenuItem } from '../../functions/check-menu-item';

type ViewModel<T> = {
  items: Signal<T[]>;
  showHeaderBottomBorder: Signal<boolean>;
  showFooterTopBorder: Signal<boolean>;
  setContainerHeight: (height: number) => void;
  setMenuHeight: (height: number) => void;
  setScroll: (scroll: Event) => void;
};

@Component({
  selector: 'aside[kirby-x-sidebar-menu]',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  imports: [HeightObserverDirective, MenuContainerComponent],
})
export class SidebarMenuComponent<T extends SidebarMenuItem> {
  readonly menuItems = model.required<T[]>();
  readonly autoCollapse = input<boolean>(false);
  readonly submenuToggle = output<T>();
  readonly itemClick = output<T>();
  readonly itemChecked = output<CheckEvent<T>>();

  readonly #sidebarService = inject(SidebarService);
  readonly #menuStateService = inject(MenuStateService<T>);

  constructor() {
    effect(() => {
      const toggledSubmenu = this.#menuStateService.toggledSubmenu();
      if (toggledSubmenu) {
        this.submenuToggle.emit(toggledSubmenu);
        this.menuItems.update((items) =>
          this.autoCollapse()
            ? toggleSubmenuAutoCollapsed(toggledSubmenu.id, items)
            : toggleSubmenu(toggledSubmenu.id, items)
        );
      }
    });

    effect(() => {
      const selectedItem = this.#menuStateService.selectedItem();
      if (selectedItem) {
        this.itemClick.emit(selectedItem);
        this.menuItems.update((items) => selectMenuItem(selectedItem.id, items));
      }
    });

    effect(() => {
      const checkEvent = this.#menuStateService.checkEvent();
      if (checkEvent) {
        this.itemChecked.emit(checkEvent);
        this.menuItems.update((items) =>
          checkMenuItem(checkEvent.item.id, checkEvent.checked, items)
        );
      }
    });
  }

  #setContainerHeight(height: number): void {
    this.#sidebarService.containerHeight = height;
  }

  #setMenuHeight(height: number): void {
    this.#sidebarService.menuHeight = height;
  }

  #setScrollDistance(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      this.#sidebarService.scrollDistance = target.scrollTop;
    }
  }

  readonly vm: ViewModel<T> = {
    items: this.menuItems.asReadonly(),
    showHeaderBottomBorder: this.#sidebarService.showHeaderBottomBorder,
    showFooterTopBorder: this.#sidebarService.showFooterTopBorder,
    setContainerHeight: this.#setContainerHeight.bind(this),
    setMenuHeight: this.#setMenuHeight.bind(this),
    setScroll: this.#setScrollDistance.bind(this),
  };
}
