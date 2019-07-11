import { ThemeColor } from './../../../helpers/theme-color.type';

export interface ListSwipeAction {
  swipeActionFlag: string;
  title: string;
  altTitle?: string;
  iconName?: string;
  altIconName?: string;
  themeColor?: ThemeColor;
  onSelected: (item: any) => void;
}
