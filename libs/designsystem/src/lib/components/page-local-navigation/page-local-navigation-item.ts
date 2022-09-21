import { ThemeColor } from '@kirbydesign/core';

export type LocalNavigationItemBadge = {
  icon?: string;
  content?: string;
  description?: string;
  isCustomIcon?: boolean;
  themeColor: ThemeColor;
};

export interface LocalNavigationItem {
  /**
   * Text of the item
   */
  text: string;

  /**
   * Id of the item. Must be unique!
   */
  id: string;

  /**
   * Optional badge to show with the item
   */
  badge?: LocalNavigationItemBadge;
}
