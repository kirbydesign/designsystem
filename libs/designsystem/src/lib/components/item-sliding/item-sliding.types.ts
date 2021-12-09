export type ItemSlidingSide = 'left' | 'right';

export type ItemSwipeActionType = 'success' | 'warning' | 'danger';

export type ItemSwipeActionSlots = 'start' | 'end';

export type ItemSwipeAction = {
  title: string;
  // TODO: item is not provided in the function. Remove it.
  onSelected: (item: any) => void;
  icon?: string;
  type?: ItemSwipeActionType;
  isDisabled?: boolean;
};
