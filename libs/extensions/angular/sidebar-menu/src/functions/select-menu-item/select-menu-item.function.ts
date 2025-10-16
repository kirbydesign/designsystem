import { SidebarMenuItem } from '../../models';

export function selectMenuItem<T extends SidebarMenuItem>(itemId: string, items: T[]): T[] {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, selected: true };
    }
    if (item.children) {
      return { ...item, children: selectMenuItem(itemId, item.children) };
    }
    return { ...item, selected: false };
  });
}
