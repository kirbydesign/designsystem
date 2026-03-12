import { SidebarMenuItem } from './sidebar-menu-item.model';

export type SubmenuItem = {
  id: string;
  type: 'submenu';
  title: string;
  icon?: string;
  isChildrenReorderable?: boolean;
  children: SidebarMenuItem[];
};
