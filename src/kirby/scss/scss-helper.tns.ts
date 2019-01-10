import { Color } from 'tns-core-modules/color';

/**
 * Always remember to keep this class and _native-variables.scss in sync when needed
 */
export class ScssHelper {
  public static BORDER_RADIUS = 18.0;

  // Elevation
  public static ELEVATION_CARD_RESTING = 8;
  public static ELEVATION_IMAGE = 12;

  // Breakpoints
  public static BREAKPOINT_SCREEN_L = 688 + 32;
  public static BREAKPOINT_CARD_S = 320;
  public static BREAKPOINT_CARD_M = 460;
  public static BREAKPOINT_CARD_L = 820;

  // iOS specific values
  public static SHADOW_OPACITY = 0.5;
  public static SHADOW_RADIUS = 6.0;
  public static SHADOW_OFFSET_Y = 2.0;
  public static SHADOW_COLOR = new Color('#1c1c1c');
}

export interface SassColor {
  name: string;
  type: string;
  value: {
    hex: string;
  };
}
