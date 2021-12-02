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

/* TODO: Is it possible to create this type programatically? 
https://stackoverflow.com/questions/52931116/decompose-a-typescript-union-type-into-specific-types
 Could be neat to make a generic Evaluted<ListSwipeAction> type that would return the below type */
export type EvaluatedListSwipeAction = {
  title: string;
  onSelected: (item: any) => void;
  icon?: string;
  type?: string;
  isDisabled?: boolean;
};
