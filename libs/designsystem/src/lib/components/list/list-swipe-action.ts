import { ListItem } from './list-item/list-item.component';

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
  title: ((item: ListItem) => string) | string;
  icon?: ((item: ListItem) => string) | string;
  type?: ((item: ListItem) => ActionType) | ActionType;
  onSelected: (item: ListItem) => void;
  isDisabled?: ((item: ListItem) => boolean) | boolean;
}
