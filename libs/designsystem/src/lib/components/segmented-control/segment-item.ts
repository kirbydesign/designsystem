import { ThemeColor } from '@kirbydesign/core';

type SegmentItemBadge = {
  content?: string;
  icon?: string;
  isCustomIcon?: boolean;
  description?: string;
  themeColor: ThemeColor;
};
export interface SegmentItem {
  id: string;
  text: string;
  /**
   * @deprecated Will be removed in next major version. Use `selectedIndex` or `value` on `<kirby-segmented-control>` instead.
   */
  checked?: boolean;
  badge?: Omit<SegmentItemBadge, 'isCustomIcon'>; // we do not expose the isCustom ...
}

export interface SegmentItemInternal extends SegmentItem {
  badge?: SegmentItemBadge;
}
