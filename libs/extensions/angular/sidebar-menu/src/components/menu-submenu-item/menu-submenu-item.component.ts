import { Component, computed, ElementRef, forwardRef, inject, input, Signal } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { Badge, SidebarMenuItem } from '../../models';
import { MenuItemComponent } from '../menu-item';
import { MenuItemSize } from '../../types';
import { MenuItemListComponent } from '../menu-item-list';
import { MenuStateService } from '../../services/menu-state';
import { ensureInView } from '../../functions/ensure-in-view';
import { DropDownAnimation } from '../../animations';

type ViewModel<T> = {
  id: Signal<string>;
  submenuId: Signal<string>;
  title: Signal<string>;
  size: Signal<MenuItemSize>;
  icon: Signal<string | undefined>;
  badge: Signal<Badge | undefined>;
  isExpanded: Signal<boolean>;
  children: Signal<T[]>;
  submenuSize: Signal<MenuItemSize>;
  disableAnimations: Signal<boolean>;
  toggleSubmenu: () => void;
};

@Component({
  selector: 'li[kirby-x-menu-submenu-item]',
  templateUrl: './menu-submenu-item.component.html',
  styleUrls: ['./menu-submenu-item.component.scss'],
  animations: [DropDownAnimation],
  imports: [MenuItemComponent, IconComponent, forwardRef(() => MenuItemListComponent)],
})
export class MenuSubmenuItemComponent<T extends SidebarMenuItem> {
  readonly item = input.required<T>();
  readonly size = input.required<MenuItemSize>();
  readonly disableAnimations = input.required<boolean>();

  readonly #element = inject(ElementRef).nativeElement as Element;
  readonly #menuStateService = inject(MenuStateService);

  readonly #isExpanded = computed(() => this.item().isExpanded ?? false);
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
      console.log('Ensuring submenu item is in view');
      ensureInView(scrollContainer, button, 400);
    }
    this.#menuStateService.toggledSubmenu = this.item();
  }

  readonly vm: ViewModel<T> = {
    id: computed(() => this.item().id),
    submenuId: computed(() => `item-${this.item().id}-content`),
    title: computed(() => this.item().title ?? ''),
    size: this.size,
    icon: computed(() => this.item().icon),
    badge: computed(() => this.item().badge),
    isExpanded: this.#isExpanded,
    children: computed(() => this.item().children ?? []),
    submenuSize: this.#submenuSize,
    disableAnimations: this.disableAnimations,
    toggleSubmenu: this.#toggleSubmenu.bind(this),
  };
}
