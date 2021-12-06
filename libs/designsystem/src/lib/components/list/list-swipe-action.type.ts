export type ListSwipeActionType = 'success' | 'warning' | 'danger';

export type ListSwipeDirection = 'right' | 'left';

export type ListSwipeEnd = 'start' | 'end';

export type ItemListSwipeAction = {
  title: string;
  onSelected: (item: any) => void;
  icon?: string;
  type?: string;
  isDisabled?: boolean;
};

/* 
    Copy each property in ItemListSwipeAction but make it possible to provide them via a function.
    If the property is a function do not modify it.
   */
export type ListSwipeAction = {
  [Property in keyof ItemListSwipeAction]: ItemListSwipeAction[Property] extends Function
    ? ItemListSwipeAction[Property]
    : ((item: any) => ItemListSwipeAction[Property]) | ItemListSwipeAction[Property];
} & {
  position: ListSwipeDirection;
};
