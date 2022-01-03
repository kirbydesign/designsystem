export type ItemSlidingSide = 'left' | 'right';

export type ItemSwipeActionType = 'success' | 'warning' | 'danger';

export type ItemSwipeActionSlots = 'start' | 'end';

export type ItemSwipeAction = {
  title: string;
  onSelected: () => void;
  icon?: string;
  type?: ItemSwipeActionType;
  isDisabled?: boolean;
};
