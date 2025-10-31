import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { DropDownAnimation } from '../../animations';
import { ensureInView } from '../../functions/ensure-in-view';
import { SidebarMenuItem } from '../../models';
import { MenuStateService } from '../../services/menu-state';
import { MenuItemContentComponent } from '../menu-item-content';

type ViewModel<T> = {
  id: Signal<string | undefined>;
  items: Signal<T[]>;
  level: Signal<number>;
  disableAnimations: Signal<boolean>;
  toggleSubmenu: (item: T) => void;
  selectItem: (item: T) => void;
};

@Component({
  selector: 'kirby-x-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [DropDownAnimation],
  imports: [DividerComponent, MenuItemContentComponent, RouterLink],
})
export class MenuItemListComponent<T extends SidebarMenuItem> {
  readonly items = input.required<T[]>();
  readonly level = input<number>(0);
  readonly id = input<string>();
  readonly disableAnimations = input<boolean>(false);

  readonly #menuStateService = inject(MenuStateService);

  #toggleSubmenu(item: T) {
    const itemElement = document.getElementById(`item${item.id}`);
    const scrollContainer: HTMLElement | null = itemElement?.closest('.sidebar-content') ?? null;
    if (itemElement && scrollContainer) {
      ensureInView(scrollContainer, itemElement, 400);
    }
    this.#menuStateService.toggledSubmenu = item;
  }

  #selectItem(item: T) {
    this.#menuStateService.selectedItem = item;
  }

  readonly vm: ViewModel<T> = {
    id: this.id,
    items: computed(() => this.items().filter((item) => !item.hidden)),
    level: this.level,
    disableAnimations: this.disableAnimations,
    toggleSubmenu: this.#toggleSubmenu.bind(this),
    selectItem: this.#selectItem.bind(this),
  };
}
