import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  Signal,
  signal,
} from '@angular/core';

import { scrollIntoViewIfNecessary } from '../../functions/scroll-into-view-if-necessary';
import { SidebarMenuItem } from '../../models';
import { MenuItemListComponent } from '../menu-item-list';

type ViewModel = {
  items: Signal<SidebarMenuItem[]>;
  disableAnimations: Signal<boolean>;
};

@Component({
  selector: 'kirby-x-menu-container',
  template: `
    <nav aria-label="Sidebar Menu">
      <ul
        kirby-x-menu-item-list
        [items]="vm.items()"
        [disableAnimations]="vm.disableAnimations()"
      ></ul>
    </nav>
  `,
  styles: 'nav { padding: 0 var(--kirby-spacing-xxs); }',
  imports: [MenuItemListComponent],
})
export class MenuContainerComponent {
  readonly items = input.required<SidebarMenuItem[]>();

  readonly #element = inject(ElementRef).nativeElement;

  readonly #disableAnimations = signal<boolean>(true);

  constructor() {
    afterNextRender({
      read: () => {
        this.#scrollSelectedItemIntoView();
        this.#disableAnimations.set(false);
      },
    });
  }

  #scrollSelectedItemIntoView() {
    const selectedItem = this.#element.querySelector('.menu-item.selected');
    const scrollContainer = this.#element.closest('.sidebar-content');
    if (selectedItem && scrollContainer) {
      scrollIntoViewIfNecessary(scrollContainer, selectedItem);
    }
  }

  readonly vm: ViewModel = {
    items: this.items,
    disableAnimations: this.#disableAnimations.asReadonly(),
  };
}
