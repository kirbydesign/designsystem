import { Component, computed, ElementRef, forwardRef, inject, input, Signal } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ReorderEvent, SubmenuItem } from '../../models';
import { MenuItemComponent } from '../menu-item';
import { MenuItemSize } from '../../types';
import { MenuItemListComponent } from '../menu-item-list';
import { MenuStateService } from '../../services/menu-state';
import { ensureInView } from '../../functions/ensure-in-view';
import { DropDownAnimation } from '../../animations';

type ViewModel = {
  item: Signal<SubmenuItem>;
  size: Signal<MenuItemSize>;
  isExpanded: Signal<boolean>;
  submenuId: Signal<string>;
  submenuSize: Signal<MenuItemSize>;
  animationsDisabled: Signal<boolean>;
  toggleSubmenu: () => void;
  reorderItem: (event: CdkDragDrop<string[]>) => void;
};

@Component({
  selector: 'li[kirby-x-menu-submenu-item]',
  templateUrl: './menu-submenu-item.component.html',
  styleUrls: ['./menu-submenu-item.component.scss'],
  animations: [DropDownAnimation],
  imports: [MenuItemComponent, IconComponent, forwardRef(() => MenuItemListComponent), CdkDropList],
})
export class MenuSubmenuItemComponent {
  readonly item = input.required<SubmenuItem>();
  readonly size = input.required<MenuItemSize>();

  readonly #element = inject(ElementRef).nativeElement as Element;
  readonly #stateService = inject(MenuStateService);

  readonly #isExpanded = computed(() => {
    const id = this.item().id;
    const expandedItems = this.#stateService.expandedItems();
    return expandedItems.has(id);
  });
  readonly #submenuSize = computed(() => {
    switch (this.size()) {
      case 'lg':
        return 'md';
      case 'md':
        return 'sm';
      default:
        return 'xs';
    }
  });

  #toggleSubmenu(): void {
    const button = this.#element.querySelector('button[kirby-x-menu-item]');
    const scrollContainer = this.#element.closest('.sidebar-content');
    if (button && scrollContainer) {
      ensureInView(scrollContainer, button, 400);
    }
    if (this.#isExpanded()) {
      this.#stateService.collapseItem(this.item().id);
    } else {
      this.#stateService.expandItem(this.item().id);
    }
  }

  #reorderItem(event: CdkDragDrop<string[]>): void {
    this.#stateService.reorderItems(
      this.item(),
      event.item.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  readonly vm: ViewModel = {
    item: this.item,
    size: this.size,
    isExpanded: this.#isExpanded,
    submenuId: computed(() => `item-${this.item().id}-content`),
    submenuSize: this.#submenuSize,
    animationsDisabled: this.#stateService.animationsDisabled,
    toggleSubmenu: this.#toggleSubmenu.bind(this),
    reorderItem: this.#reorderItem.bind(this),
  };
}
