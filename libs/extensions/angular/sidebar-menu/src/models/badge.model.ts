import type { ThemeColor } from '@kirbydesign/designsystem';

export type Badge = {
  value: string;
  themeColor?: ThemeColor;
  slot?: string;
};
