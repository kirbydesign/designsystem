export enum ActionType {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export enum SwipeDirection {
  right = 'right',
  left = 'left',
}

export enum SwipeEnd {
  start = 'start',
  end = 'end',
}

export interface ListSwipeAction {
  position: SwipeDirection;
  title: ((item: any) => string) | string;
  icon?: ((item: any) => string) | string;
  type?: ((item: any) => ActionType) | ActionType;
  onSelected: (item: any) => void;
  isDisabled?: ((item: any) => boolean) | boolean;
}
