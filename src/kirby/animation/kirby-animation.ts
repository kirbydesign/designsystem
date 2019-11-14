export namespace KirbyAnimation {
  export enum Duration {
    // Duration in milliseconds
    QUICK = 200,
    SHORT = 300,
    LONG = 500,
    TEST = 1000,
  }

  export enum Easing {
    STATIC = 'linear',
    SOFT = 'ease-out',
    MOTION = 'cubic-bezier(.25, .1, .25, 1)',
  }
}
