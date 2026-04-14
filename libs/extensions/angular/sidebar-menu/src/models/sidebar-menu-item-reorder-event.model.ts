export type SidebarMenuItemReorderEvent = {
  parentId: string;
  itemId: string;
  previousIndex: number;
  currentIndex: number;
  reorderedItemIds: string[];
};
