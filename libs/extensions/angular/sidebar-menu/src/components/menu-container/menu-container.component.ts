import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Signal,
} from '@angular/core';

import { scrollIntoViewIfNecessary } from '../../functions/scroll-into-view-if-necessary';
import { SidebarMenuItem } from '../../models';
import { MenuItemListComponent } from '../menu-item-list';
import { MenuStateService } from '../../services/menu-state';

type ViewModel = {
  items: Signal<SidebarMenuItem[]>;
};

@Component({
  selector: 'kirby-x-menu-container',
  template: `
    <nav aria-label="Sidebar Menu">
      <ul kirby-x-menu-item-list [items]="vm.items()"></ul>
    </nav>
  `,
  styles: 'nav { padding: 0 var(--kirby-spacing-xxs); }',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MenuItemListComponent],
})
export class MenuContainerComponent {
  readonly #element = inject(ElementRef).nativeElement;
  readonly #stateService = inject(MenuStateService);

  constructor() {
    this.#stateService.animationsDisabled = true;
    afterNextRender({
      read: () => {
        this.#scrollSelectedItemIntoView();
        this.#stateService.animationsDisabled = false;
      },
    });
  }

  #scrollSelectedItemIntoView() {
    const selectedItem = this.#element.querySelector('li.selected');
    const scrollContainer = this.#element.closest('.sidebar-content');
    if (selectedItem && scrollContainer) {
      scrollIntoViewIfNecessary(scrollContainer, selectedItem);
    }
  }

  readonly vm: ViewModel = {
    items: this.#stateService.menuItems,
  };
}
