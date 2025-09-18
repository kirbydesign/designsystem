export interface Illustration {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export enum SpotIllustrationSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export const illustrations = {
  'airballoon-wind': {
    md: 'airballoon.wind.dot.cloud.md.svg',
  },
  'box-add': {
    lg: 'box-add.dot.bars.large.svg',
  },
  'box-curve': {
    md: 'box.curve.dot.circle.md.svg',
  },
  'calculator-money': {
    md: 'calculator-money.dot.retangle.medium.svg',
  },
  'calendar-loop-magnify': {
    lg: 'chart-loop-arrow.dot.bars.large.svg',
    xl: 'calender-loop-arrow.dot.bars.xlarge.svg',
  },
  'calendar-money': {
    md: 'bar.calendar.money.medium.svg',
  },
  'calendar-money-arrow': {
    md: 'calender-money.arrows.dot.bars.md.svg',
    lg: 'calender-money.dot.arrows.bars.large.svg',
  },
  checkmark: {
    lg: 'checkmark.dot.circle.large.svg',
  },
  'checkmark-success': {
    lg: 'checkmark.success.lg.svg',
  },
  'clock-attention': {
    md: 'clock.attention.triangledot.bars.medium.svg',
  },
  'clock-checkmark': {
    lg: 'clock-checkmark.dot.bars.x-large.svg',
  },
  'computer-certificate-keylock': {
    lg: 'computer-certificate-keylock.dot.circle.large.svg',
  },
  'cross-alert': {
    lg: 'cross.alert.lg.svg',
  },
  'exclamation-mark-warning': {
    lg: 'exclamation-mark.warning.lg.svg',
  },
  'hand-balloon': {
    xl: 'hand-baloon.dot.circle.xlarge.svg',
  },
  'hand-money': {
    md: 'hand-money.dot.bars.medium.svg',
  },
  'investboard-money': {
    md: 'investboard.money.arrows.dot.bars.md.svg',
  },
  'investboard-papers': {
    md: 'investboard.papers.dot.rectangle.md.svg',
    lg: 'investboard.papers.dot.rectangle.large.svg',
    xl: 'investboard-money.dot.circle.xlarge.svg',
  },
  megaphone: {
    xl: 'megaphone.dot.x-large.svg',
  },
  money: {
    md: 'money.dot.bars.medium.svg',
  },
  'money-circle': {
    md: 'money-circle.dot.bars.medium.svg',
  },
  'piggy-bank': {
    md: 'piggy-bank.money.dot.bars.md.svg',
  },
  'plant-leaf': {
    md: 'plant-leaf.bars.medium.svg',
  },
  robot: {
    lg: 'robot.NONE.dot.body.lg.svg',
  },
  'DEPRECATED-miv-coin-stack': {
    sm: 'miv.sm.svg',
    md: 'miv.md.svg',
    lg: 'miv.lg.svg',
  },
} as const satisfies Record<string, Illustration>;

export type SpotIllustrationName = keyof typeof illustrations | null;
