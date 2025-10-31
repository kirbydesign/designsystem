import { SidebarMenuItem } from '../../models';

export function toggleSubmenu<T extends SidebarMenuItem>(itemId: string, items: T[]): T[] {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, isExpanded: !item.isExpanded };
    }
    if (item.children && item.isExpanded) {
      return { ...item, children: toggleSubmenu(itemId, item.children) };
    }
    return item;
  });
}
