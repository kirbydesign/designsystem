import { ItemSwipeAction } from '../item-sliding/item-sliding.types';
import { ItemSlidingSide as ListSwipeDirection } from '../item-sliding/item-sliding.types';

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

// To not break old imports relying on ListSwipeActionType
export {
  ItemSwipeActionType as ListSwipeActionType,
  ItemSwipeActionSlots as ListSwipeEnd,
} from '../item-sliding/item-sliding.types';

export { ListSwipeDirection };
