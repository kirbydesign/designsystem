import { ThemeColor } from '../../helpers/theme-color.type';

export interface SegmentItem {
  text: string;
  id: string;
  checked: boolean;
  badge?: {
    content: string;
    themeColor: ThemeColor;
  };
}
