// TODO TRM/JEO Parse from scss files instead!!1!!
export class ScssHelper {
  // Breakpoints
  public static BREAKPOINT_SCREEN_L = 720;
  public static BREAKPOINT_CARD_S = 320;
  public static BREAKPOINT_CARD_M = 460;
  public static BREAKPOINT_CARD_L = 820;
}

export interface SassColor {
  name: string;
  value: {
    hex: string;
  };
  tint: {
    name: string;
    hex: string;
  };
  shade: {
    name: string;
    hex: string;
  };
  contrast: {
    name: string;
    hex: string;
  };
}
