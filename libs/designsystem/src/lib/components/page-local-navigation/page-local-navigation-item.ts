import { ThemeColor } from '@kirbydesign/core';

type ItemBadge = {
  content: {
    name?: string;
    isCustom?: boolean;
    text?: string;
  };
  description?: string;
  themeColor: ThemeColor;
};

export interface LocalNavigationItem {
  /**
   * Text of the item
   */
  text: string;

  /**
   * Optional badge to show with the item
   */
  badge?: ItemBadge;
}
