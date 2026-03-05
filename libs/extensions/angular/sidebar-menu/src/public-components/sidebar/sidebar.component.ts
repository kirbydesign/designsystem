import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { SidebarMenuItem } from '../../models';
import { SidebarMenuComponent } from '../../components/sidebar-menu';
import { MenuStateService } from '../../services/menu-state';

@Component({
  selector: 'kirby-x-sidebar',
  template: `
    <aside kirby-x-sidebar-menu>
      <ng-content select="kirby-x-sidebar-header" slot="header"></ng-content>
      <ng-content select="kirby-x-sidebar-footer" slot="footer"></ng-content>
    </aside>
  `,
  imports: [SidebarMenuComponent],
})
export class SidebarComponent {
  readonly #stateService = inject(MenuStateService);

  @Input()
  set menuItems(menuItems: SidebarMenuItem[]) {
    this.#stateService.menuItems = menuItems;
  }

  @Input()
  set selectedItem(value: string) {
    this.#stateService.selectedItem = value;
  }

  @Input()
  set expandedItems(value: Set<string>) {
    this.#stateService.expandedItems = value;
  }

  @Input()
  set checkedItems(value: Set<string>) {
    this.#stateService.checkedItems = value;
  }

  @Input()
  set autoCollapse(value: boolean) {
    this.#stateService.autoCollapse = value;
  }

  @Output() selectedItemChange = this.#stateService.selectEvents;
  @Output() expandedItemsChange = new EventEmitter<Set<string>>();
  @Output() checkedItemsChange = new EventEmitter<Set<string>>();
  @Output() expandChange = this.#stateService.expandEvents;
  @Output() checkChange = this.#stateService.checkEvents;

  constructor() {
    effect(() => this.expandedItemsChange.emit(this.#stateService.expandedItems()));
    effect(() => this.checkedItemsChange.emit(this.#stateService.checkedItems()));
  }
}
