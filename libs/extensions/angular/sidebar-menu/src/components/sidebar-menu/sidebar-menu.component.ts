import { Component, inject, Signal } from '@angular/core';
import { MenuContainerComponent } from '../menu-container';
import { HeightObserverDirective } from '../../directives/height-observer';
import { SidebarService } from '../../services/sidebar';
import { MenuItem } from '../../models';
import { MenuStateService } from '../../services/menu-state';

type ViewModel = {
  items: Signal<MenuItem[]>;
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
export class SidebarMenuComponent {
  readonly #sidebarService = inject(SidebarService);
  readonly #stateService = inject(MenuStateService);

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

  readonly vm: ViewModel = {
    items: this.#stateService.menuItems,
    showHeaderBottomBorder: this.#sidebarService.showHeaderBottomBorder,
    showFooterTopBorder: this.#sidebarService.showFooterTopBorder,
    setContainerHeight: this.#setContainerHeight.bind(this),
    setMenuHeight: this.#setMenuHeight.bind(this),
    setScroll: this.#setScrollDistance.bind(this),
  };
}
