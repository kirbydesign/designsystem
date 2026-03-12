import { SidebarMenuItem } from './sidebar-menu-item.model';

export interface SidebarReorderEvent {
  /** The item that was moved */
  item: SidebarMenuItem;
  /** The previous index of the item within its section */
  previousIndex: number;
  /** The new index of the item within its section */
  currentIndex: number;
  /** The updated full list of menu items after reorder */
  menuItems: SidebarMenuItem[];
}
