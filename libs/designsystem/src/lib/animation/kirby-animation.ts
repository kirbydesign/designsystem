import { styles } from '../helpers/design-token-helper.styles';

export namespace KirbyAnimation {
  export enum Duration {
    // Duration in milliseconds
    QUICK = parseInt(styles.transitionDuration.quick),
    SHORT = parseInt(styles.transitionDuration.short),
    LONG = parseInt(styles.transitionDuration.long),
    EXTRA_LONG = parseInt(styles.transitionDuration.extraLong),
  }
}
