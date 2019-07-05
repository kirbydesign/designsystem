import { ThemeColor } from './../../../helpers/theme-color.type';

export interface ItemOption {
  id: string;
  title: string;
  iconName?: string;
  themeColor: ThemeColor;
  selected: boolean;
}

export interface SelectedItemWithOption {
  item: any;
  option: ItemOption;
}
