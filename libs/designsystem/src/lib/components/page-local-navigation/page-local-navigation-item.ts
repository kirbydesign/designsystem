import { ThemeColor } from '@kirbydesign/core';

type BadgeIcon = {
  name: string;
  isCustom: boolean;
};

type BadgeText = {
  text: string;
};

type ItemBadge = {
  content: BadgeIcon | BadgeText;
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
