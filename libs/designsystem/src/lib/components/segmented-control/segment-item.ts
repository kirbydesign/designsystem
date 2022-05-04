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
  badge?: Omit<SegmentItemBadge, 'isCustomIcon'>; // we do not expose the isCustomIcon for the external type
}

export interface SegmentItemInternal extends SegmentItem {
  badge?: SegmentItemBadge;
}
