import { ItemSwipeAction } from '@kirbydesign/designsystem/item-sliding';

import { ItemSlidingSide as ListSwipeDirection } from '@kirbydesign/designsystem/item-sliding';

// Copy each property in ItemSwipeAction but make it possible to provide them via a function.
type ListSwipeActionBaseTypes = Pick<ItemSwipeAction, 'title' | 'icon' | 'type' | 'isDisabled'>;
export type ListSwipeAction = {
  [Property in keyof ListSwipeActionBaseTypes]:
    | ((item: any) => ListSwipeActionBaseTypes[Property])
    | ListSwipeActionBaseTypes[Property];
} & {
  position: ListSwipeDirection;
  onSelected: (item: any) => void;
};

// To not break old imports relying on ListSwipeActionType
export {
  ItemSwipeActionType as ListSwipeActionType,
  ItemSwipeActionSlots as ListSwipeEnd,
} from '@kirbydesign/designsystem/item-sliding';

export { ListSwipeDirection };
