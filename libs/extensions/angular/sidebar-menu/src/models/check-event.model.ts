import { SidebarMenuItem } from './menu-item';

export type CheckEvent<T extends SidebarMenuItem> = {
  item: T;
  checked: boolean;
};
