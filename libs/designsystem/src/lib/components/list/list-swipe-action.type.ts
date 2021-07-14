export type ListSwipeActionType = 'success' | 'warning' | 'danger';

export type ListSwipeDirection = 'right' | 'left';

export type ListSwipeEnd = 'start' | 'end';

export interface ListSwipeAction {
  position: ListSwipeDirection;
  title: ((item: any) => string) | string;
  icon?: ((item: any) => string) | string;
  type?: ((item: any) => ListSwipeActionType) | ListSwipeActionType;
  onSelected: (item: any) => void;
  isDisabled?: ((item: any) => boolean) | boolean;
}
