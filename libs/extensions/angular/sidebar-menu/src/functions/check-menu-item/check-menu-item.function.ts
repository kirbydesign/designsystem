import { SidebarMenuItem } from '../../models';

export function checkMenuItem<T extends SidebarMenuItem>(
  itemId: string,
  isChecked: boolean,
  items: T[]
): T[] {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, toggle: { ...item.toggle, isChecked } };
    }
    if (item.children) {
      return { ...item, children: checkMenuItem(itemId, isChecked, item.children) };
    }
    return item;
  });
}
