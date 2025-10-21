import { Component, computed, ElementRef, forwardRef, inject, input, Signal } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
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
  showDisclosure: Signal<boolean>;
  isExpanded: Signal<boolean>;
  children: Signal<T[]>;
  submenuSize: Signal<MenuItemSize>;
  disableAnimations: Signal<boolean>;
  toggleSubmenu: () => void;
};

@Component({
  selector: 'kirby-x-menu-submenu-item',
  templateUrl: './menu-submenu-item.component.html',
  styleUrls: ['./menu-submenu-item.component.scss'],
  animations: [DropDownAnimation],
  imports: [MenuItemComponent, IconModule, forwardRef(() => MenuItemListComponent)],
})
export class MenuSubmenuItemComponent<T extends SidebarMenuItem> {
  readonly item = input.required<T>();
  readonly size = input.required<MenuItemSize>();
  readonly disableAnimations = input.required<boolean>();

  readonly #element = inject(ElementRef).nativeElement as HTMLElement;
  readonly #menuStateService = inject(MenuStateService);

  readonly #isExpanded = computed(() => this.item().isExpanded ?? false);
  readonly #icon = computed(() => {
    if (this.size() === 'lg') {
      return this.item().icon;
    }
    return this.#isExpanded() ? 'remove' : 'add';
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
    const scrollContainer: HTMLElement | null = this.#element?.closest('.sidebar-content') ?? null;
    if (scrollContainer) {
      console.log('Ensuring submenu item is in view');
      ensureInView(scrollContainer, this.#element, 400);
    }
    this.#menuStateService.toggledSubmenu = this.item();
  }

  readonly vm: ViewModel<T> = {
    id: computed(() => this.item().id),
    submenuId: computed(() => `item-${this.item().id}-content`),
    title: computed(() => this.item().title ?? ''),
    size: this.size,
    icon: this.#icon,
    badge: computed(() => this.item().badge),
    showDisclosure: computed(() => this.size() === 'lg'),
    isExpanded: this.#isExpanded,
    children: computed(() => this.item().children ?? []),
    submenuSize: this.#submenuSize,
    disableAnimations: this.disableAnimations,
    toggleSubmenu: this.#toggleSubmenu.bind(this),
  };
}
