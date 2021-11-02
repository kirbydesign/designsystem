import { ThemeColor } from '@kirbydesign/core';

export interface SegmentItem {
  id: string;
  text: string;
  /**
   * @deprecated Will be removed in next major version. Use `selectedIndex` or `value` on `<kirby-segmented-control>` instead.
   */
  checked?: boolean;
  badge?: {
    content?: string;
    icon?: string;
    description?: string;
    themeColor: ThemeColor;
  };
}
