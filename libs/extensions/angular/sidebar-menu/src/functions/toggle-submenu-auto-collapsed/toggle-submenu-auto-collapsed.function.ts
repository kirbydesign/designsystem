import { SidebarMenuItem } from '../../models';

export function toggleSubmenuAutoCollapsed<T extends SidebarMenuItem>(
  itemId: string,
  items: T[]
): T[] {
  return toggleSubmenuAndCollapseNonAncestors(itemId, items).updatedItems;
}

function toggleSubmenuAndCollapseNonAncestors<T extends SidebarMenuItem>(
  itemId: string,
  items: T[]
): { updatedItems: T[]; isAncestor: boolean } {
  let found = false;
  const updatedItems = items.map((item) => {
    if (found) {
      return collapse(item);
    }
    if (item.id === itemId) {
      found = true;
      return item.isExpanded ? collapse(item) : { ...item, isExpanded: true };
    }
    if (item.children && item.isExpanded) {
      const { updatedItems, isAncestor } = toggleSubmenuAndCollapseNonAncestors(
        itemId,
        item.children
      );
      found = isAncestor;
      return { ...item, isExpanded: isAncestor, children: updatedItems };
    }
    return item;
  });
  return { updatedItems, isAncestor: found };
}

function collapse<T extends SidebarMenuItem>(item: T): T {
  if (item.children && item.isExpanded) {
    return { ...item, isExpanded: false, children: item.children.map(collapse) };
  }
  return item;
}
