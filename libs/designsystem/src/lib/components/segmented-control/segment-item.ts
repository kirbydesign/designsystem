import { ThemeColor } from '@kirbydesign/core';

type SegmentItemBadge = {
  content?: string;
  icon?: string;
  description?: string;
  themeColor: ThemeColor;
};
export interface SegmentItem {
  id: string;
  text: string;
  ariaLabel?: string;
  badge?: SegmentItemBadge;
}
