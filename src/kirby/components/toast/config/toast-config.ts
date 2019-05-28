import { ThemeColor } from './../../../helpers/theme-color.type';

export interface ToastConfig {
  message?: string;
  position?: 'top' | 'bottom' | 'middle';
  duration?: number;
  closeBtnText?: string;
  themeColor?: ThemeColor;
}
