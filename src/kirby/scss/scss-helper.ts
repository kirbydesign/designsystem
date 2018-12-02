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

  // iOS specific values, not used on web
  public static SHADOW_OPACITY = null;
  public static SHADOW_RADIUS = null;
  public static SHADOW_OFFSET_Y = null;
  public static SHADOW_COLOR = null;
}
