import { ThemeColor } from '../../helpers/theme-color.type';

export interface ListSwipeAction {
  position: 'left' | 'right';
  title: ((item: any) => string) | string;
  iconName?: ((item: any) => string) | string;
  themeColor?: ((item: any) => ThemeColor) | ThemeColor;
  onSelected: (item: any) => void;
  isDisabled?: ((item: any) => boolean) | boolean;
}
