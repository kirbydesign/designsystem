import { Component, computed, inject, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Badge, SidebarMenuItem } from '../../models';
import { MenuItemSize } from '../../types';
import { MenuItemComponent } from '../menu-item';
import { MenuStateService } from '../../services/menu-state';

type ViewModel = {
  link: Signal<LinkType | undefined>;
  id: Signal<string>;
  size: Signal<MenuItemSize>;
  badge: Signal<Badge | undefined>;
  icon: Signal<string | undefined>;
  isSelected: Signal<boolean>;
  title: Signal<string>;
  selectItem: () => void;
};

@Component({
  selector: 'kirby-x-menu-anchor-item',
  templateUrl: './menu-anchor-item.component.html',
  styleUrls: ['./menu-anchor-item.component.scss'],
  imports: [MenuItemComponent, RouterLink],
})
export class MenuAnchorItemComponent<T extends SidebarMenuItem> {
  readonly item = input.required<T>();
  readonly size = input.required<MenuItemSize>();

  readonly #menuStateService = inject(MenuStateService);

  #selectItem(): void {
    this.#menuStateService.selectedItem = this.item();
  }

  readonly vm: ViewModel = {
    link: computed(() => determineLinkType(this.item())),
    id: computed(() => this.item().id),
    size: this.size,
    badge: computed(() => this.item().badge),
    icon: computed(() => (this.size() === 'lg' ? this.item().icon : 'arrow-right-fill')),
    isSelected: computed(() => this.item().selected ?? false),
    title: computed(() => this.item().title ?? ''),
    selectItem: this.#selectItem.bind(this),
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
