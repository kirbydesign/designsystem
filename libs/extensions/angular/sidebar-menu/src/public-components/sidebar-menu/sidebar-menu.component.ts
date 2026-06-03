import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { MenuContainerComponent } from '../../components/menu-container';
import { HeightObserverDirective } from '../../directives/height-observer';
import { SidebarService } from '../../services/sidebar';
import { MenuStateService } from '../../services/menu-state';
import { SidebarMenuItem } from '../../models';

@Component({
  selector: 'kirby-x-sidebar-menu-content',
  template: `
    <ng-content>
      <kirby-x-menu-container
        kirbyXHeightObserver
        (heightChange)="setMenuHeight($event)"
      ></kirby-x-menu-container>
    </ng-content>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  `,
  imports: [MenuContainerComponent, HeightObserverDirective],
})
export class SidebarMenuComponent {
  readonly #sidebarService = inject(SidebarService);
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

  setMenuHeight(height: number): void {
    this.#sidebarService.menuHeight = height;
  }

  @Output() menuItemsChange = new EventEmitter<SidebarMenuItem[]>();
  @Output() selectedItemChange = new EventEmitter<string>();
  @Output() expandedItemsChange = new EventEmitter<Set<string>>();
  @Output() checkedItemsChange = new EventEmitter<Set<string>>();
  @Output() expandChange = this.#stateService.expandEvents;
  @Output() checkChange = this.#stateService.checkEvents;
  @Output() itemReorder = this.#stateService.reorderEvents;
  @Output() itemSelect = this.#stateService.selectEvents;

  constructor() {
    effect(() => this.menuItemsChange.emit(this.#stateService.menuItems()));
    effect(() => this.selectedItemChange.emit(this.#stateService.selectedItem()));
    effect(() => this.expandedItemsChange.emit(this.#stateService.expandedItems()));
    effect(() => this.checkedItemsChange.emit(this.#stateService.checkedItems()));
  }
}
