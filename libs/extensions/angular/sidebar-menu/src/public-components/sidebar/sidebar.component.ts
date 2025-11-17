import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarMenuItem } from '../../models';
import { SidebarMenuComponent } from '../../components/sidebar-menu';

@Component({
  selector: 'kirby-x-sidebar',
  template: `
    <kirby-x-sidebar-menu
      [menuItems]="menuItems"
      [autoCollapse]="autoCollapse"
      (menuItemsChange)="changeMenuItems($event)"
      (itemClick)="afterMenuClicked.emit($event)"
      (submenuToggle)="afterMenuToggled.emit($event)"
    >
      <ng-content select="kirby-x-sidebar-header" slot="header"></ng-content>
      <ng-content select="kirby-x-sidebar-footer" slot="footer"></ng-content>
    </kirby-x-sidebar-menu>
  `,
  imports: [SidebarMenuComponent],
})
export class SidebarComponent<T extends SidebarMenuItem> {
  @Input() menuItems!: T[];
  @Input() autoCollapse = false;
  @Output() menuItemsChange = new EventEmitter<T[]>();
  @Output() afterMenuClicked = new EventEmitter<T>();
  @Output() afterMenuToggled = new EventEmitter<T>();

  /**
   * @deprecated has not had an effect for a long time
   */
  @Input() expandIconOnHover = false;

  /**
   * @deprecated should use menuItemsChange or two-way binding on menuItems instead
   **/
  @Output() menuItemsChanged = new EventEmitter<T[]>();

  changeMenuItems(event: T[]): void {
    this.menuItems = event;
    this.menuItemsChange.emit(this.menuItems);
    this.menuItemsChanged.emit(this.menuItems);
  }
}
