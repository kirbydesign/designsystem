export type ReorderEvent = {
  parentId: string;
  itemId: string;
  previousIndex: number;
  currentIndex: number;
  reorderedItemIds: string[];
};
