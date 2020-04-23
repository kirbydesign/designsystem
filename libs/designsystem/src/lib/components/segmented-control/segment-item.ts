import { ThemeColor } from '../../helpers/theme-color.type';

export interface SegmentItem {
  id: string;
  text: string;
  /**
   * @deprecated Will be removed in next major version. Use `selectedIndex` or `value` on `<kirby-segmented-control>` instead.
   */
  checked?: boolean;
  badge?: {
    content: string;
    description?: string;
    themeColor: ThemeColor;
  };
}
