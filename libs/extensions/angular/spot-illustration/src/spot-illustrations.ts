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
  'calendar-money-arrow': {
    md: 'calender-money.arrows.dot.bars.md.svg',
  },
  'airballoon-wind': {
    md: 'airballoon.wind.dot.cloud.md.svg',
  },
  'box-curve': {
    md: 'box.curve.dot.circle.md.svg',
  },
  'investboard-money': {
    md: 'investboard.money.arrows.dot.bars.md.svg',
  },
  'investboard-papers': {
    md: 'investboard.papers.dot.rectangle.md.svg',
  },
  'piggy-bank': {
    md: 'piggy-bank.money.dot.bars.md.svg',
  },
  robot: {
    md: 'robot.NONE.dot.body.md.svg',
  },
  miv: {
    sm: 'miv.sm.svg',
    md: 'miv.md.svg',
    lg: 'miv.lg.svg',
  },
} as const satisfies Record<string, Illustration>;

export type IllustrationName = keyof typeof illustrations | null;
