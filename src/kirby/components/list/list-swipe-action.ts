export type ActionType = 'success' | 'warning' | 'danger';

export interface ListSwipeAction {
  position: 'left' | 'right';
  title: ((item: any) => string) | string;
  icon?: ((item: any) => string) | string;
  type?: ((item: any) => ActionType) | ActionType;
  onSelected: (item: any) => void;
  isDisabled?: ((item: any) => boolean) | boolean;
}
