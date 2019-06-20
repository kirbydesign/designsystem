import { ThemeColor } from './../../../helpers/theme-color.type';

export interface ToastConfig {
  message: string;
  durationInMs?: number;
  themeColor?: ThemeColor;
}
