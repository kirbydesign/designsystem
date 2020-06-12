import { styles } from '../helpers/design-token-helper.styles';

export namespace KirbyAnimation {
  export enum Duration {
    // Duration in milliseconds
    QUICK = parseInt(styles.transitionDurations.quick),
    SHORT = parseInt(styles.transitionDurations.short),
    LONG = parseInt(styles.transitionDurations.long),
    EXTRA_LONG = parseInt(styles.transitionDurations.extraLong),
  }
}
