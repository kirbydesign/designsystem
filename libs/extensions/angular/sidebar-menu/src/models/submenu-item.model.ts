import { MenuItem } from './menu-item.model';

export type SubmenuItem = {
  id: string;
  type: 'submenu';
  title: string;
  icon?: string;
  children: MenuItem[];
};
