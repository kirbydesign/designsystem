import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleButtonComponent } from '@kirbydesign/designsystem/toggle-button';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ActionItem, ExternalLinkItem, RouterLinkItem } from '../../models';
import { MenuItemSize } from '../../types';
import { MenuItemComponent } from '../menu-item';
import { MenuStateService } from '../../services/menu-state';

type ViewModel = {
  item: Signal<ActionItem | RouterLinkItem | ExternalLinkItem>;
  size: Signal<MenuItemSize>;
  isSelected: Signal<boolean>;
  isChecked: Signal<boolean>;
  selectItem: () => void;
  checkItem: (checked: boolean) => void;
};

@Component({
  selector: 'li[kirby-x-menu-anchor-item]',
  templateUrl: './menu-anchor-item.component.html',
  styleUrls: ['./menu-anchor-item.component.scss'],
  host: {
    '[class.selected]': 'vm.isSelected()',
    '[class.checked]': 'vm.isChecked()',
    '[class.has-toggle]': '!!vm.item().toggle',
    '[class.has-badge]': '!!vm.item().badge',
  },
  imports: [
    MenuItemComponent,
    RouterLink,
    ToggleButtonComponent,
    ButtonComponent,
    IconComponent,
    BadgeComponent,
  ],
})
export class MenuAnchorItemComponent {
  readonly item = input.required<ActionItem | RouterLinkItem | ExternalLinkItem>();
  readonly size = input.required<MenuItemSize>();

  readonly #stateService = inject(MenuStateService);

  readonly #isSelected = computed(() => this.item().id === this.#stateService.selectedItem());
  readonly #isChecked = computed(() => {
    const id = this.item().id;
    const checkedItems = this.#stateService.checkedItems();
    return checkedItems.has(id);
  });

  #selectItem(): void {
    this.#stateService.selectedItem = this.item().id;
  }

  #checkItem(checked: boolean): void {
    if (checked) {
      this.#stateService.checkItem(this.item().id);
    } else {
      this.#stateService.uncheckItem(this.item().id);
    }
  }

  readonly vm: ViewModel = {
    item: this.item,
    size: this.size,
    isSelected: this.#isSelected,
    isChecked: this.#isChecked,
    selectItem: this.#selectItem.bind(this),
    checkItem: this.#checkItem.bind(this),
  };
}
