import type { ThemeColor } from '@kirbydesign/designsystem';
import { ToggleButton } from './toggle-button.model';

export type Params = {
  [key: string]: any;
};

export interface SidebarMenuItem {
  id: string;
  title?: string;
  link?: Link;
  icon?: string;
  iconEnd?: string;
  selected?: boolean;
  selectable?: boolean;
  isAction?: boolean;
  isExpanded?: boolean;
  isDivider?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  hidden?: boolean;
  badge?: Badge;
  toggle?: ToggleButton;
  children?: this[];
}

export interface Badge {
  value: string;
  themeColor?: ThemeColor;
  slot?: string;
}

export interface Link {
  url?: string;
  target?: string;
  relativeLink?: string;
  queryParams?: Params;
}
