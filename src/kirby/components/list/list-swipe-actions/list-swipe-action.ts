import { ThemeColor } from './../../../helpers/theme-color.type';

export class ListSwipeAction {
  swipeActionFlag: string | number;
  side: 'start' | 'end';
  title: string;
  altTitle?: string;
  iconName?: string;
  altIconName?: string;
  themeColor?: ThemeColor;
  onSelected: Function;
}
