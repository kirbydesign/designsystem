import { ThemeColor } from '../../../helpers/theme-color.type';

export interface ListSwipeAction {
  swipeActionFlag: string;
  position: 'left' | 'right';
  title: string;
  altTitle?: string;
  iconName?: string;
  altIconName?: string;
  themeColor?: ThemeColor;
  onSelected: (item: any) => void;
}
