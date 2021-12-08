export type ListSwipeActionType = 'success' | 'warning' | 'danger';

export type ListSwipeDirection = 'right' | 'left';

export type ListSwipeEnd = 'start' | 'end';

export type ItemSwipeAction = {
  title: string;
  // TODO: item is not provided in the function. Remove it.
  onSelected: (item: any) => void;
  icon?: string;
  type?: ListSwipeActionType;
  isDisabled?: boolean;
};

/* 
    Copy each property in ItemSwipeAction but make it possible to provide them via a function.
    If the property is a function do not modify it.
   */
export type ListSwipeAction = {
  [Property in keyof ItemSwipeAction]: ItemSwipeAction[Property] extends Function
    ? ItemSwipeAction[Property]
    : ((item: any) => ItemSwipeAction[Property]) | ItemSwipeAction[Property];
} & {
  position: ListSwipeDirection;
};
