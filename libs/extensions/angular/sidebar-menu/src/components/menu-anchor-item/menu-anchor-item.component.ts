import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToggleButtonComponent } from '@kirbydesign/designsystem/toggle-button';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { Badge, SidebarMenuItem, ToggleButton } from '../../models';
import { MenuItemSize } from '../../types';
import { MenuItemComponent } from '../menu-item';
import { MenuStateService } from '../../services/menu-state';

type ViewModel = {
  link: Signal<LinkType | undefined>;
  id: Signal<string>;
  size: Signal<MenuItemSize>;
  badge: Signal<Badge | undefined>;
  toggle: Signal<ToggleButton | undefined>;
  icon: Signal<string | undefined>;
  isSelected: Signal<boolean>;
  title: Signal<string>;
  selectItem: () => void;
  checkItem: (checked: boolean) => void;
};

@Component({
  selector: 'li[kirby-x-menu-anchor-item]',
  templateUrl: './menu-anchor-item.component.html',
  styleUrls: ['./menu-anchor-item.component.scss'],
  host: {
    '[class.selected]': 'vm.isSelected()',
    '[class.checked]': 'vm.toggle()?.isChecked',
    '[class.has-toggle]': '!!vm.toggle()',
    '[class.has-badge]': '!!vm.badge()',
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
export class MenuAnchorItemComponent<T extends SidebarMenuItem> {
  readonly item = input.required<T>();
  readonly size = input.required<MenuItemSize>();

  readonly #menuStateService = inject(MenuStateService);

  #selectItem(): void {
    this.#menuStateService.selectedItem = this.item();
  }

  #checkItem(checked: boolean): void {
    this.#menuStateService.checkEvent = { item: this.item(), checked };
  }

  readonly vm: ViewModel = {
    link: computed(() => determineLinkType(this.item())),
    id: computed(() => this.item().id),
    size: this.size,
    badge: computed(() => this.item().badge),
    toggle: computed(() => this.item().toggle),
    icon: computed(() => this.item().icon),
    isSelected: computed(() => this.item().selected ?? false),
    title: computed(() => this.item().title ?? ''),
    selectItem: this.#selectItem.bind(this),
    checkItem: this.#checkItem.bind(this),
  };
}

function determineLinkType(item: SidebarMenuItem): LinkType | undefined {
  if (item.isAction) {
    return {
      type: 'action',
      url: item.link?.url ?? '',
    };
  }
  if (item.link?.relativeLink) {
    return {
      type: 'router-link',
      target: item.link.target ?? '_self',
      route: item.link.relativeLink,
      queryParams: item.link.queryParams,
      skipLocationChange: item.skipLocationChange ?? false,
      replaceUrl: item.replaceUrl ?? false,
    };
  }
  if (item.link?.url) {
    return {
      type: 'external-link',
      url: item.link.url,
      target: item.link.target ?? '_self',
    };
  }
  return undefined;
}

type ActionType = {
  type: 'action';
  url: string;
};

type RouterLinkType = {
  type: 'router-link';
  target: string;
  route: string;
  queryParams?: { [key: string]: unknown };
  skipLocationChange: boolean;
  replaceUrl: boolean;
};

type ExternalLinkType = {
  type: 'external-link';
  url: string;
  target: string;
};

type LinkType = ActionType | RouterLinkType | ExternalLinkType;
