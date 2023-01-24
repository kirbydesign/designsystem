/* eslint-disable @typescript-eslint/no-namespace */
import { DesignTokenHelper } from './design-token-helper';

export namespace KirbyAnimation {
  export enum Duration {
    // Duration in milliseconds
    QUICK = parseInt(DesignTokenHelper.transitionDuration('quick')),
    SHORT = parseInt(DesignTokenHelper.transitionDuration('short')),
    LONG = parseInt(DesignTokenHelper.transitionDuration('long')),
    EXTRA_LONG = parseInt(DesignTokenHelper.transitionDuration('extraLong')),
  }
  export const Easing = DesignTokenHelper.transitionEasings();
}
