export interface Illustration {
  baseIsKirbyIcon?: boolean;
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
}

export type SpotIllustrationSize = keyof Omit<Illustration, 'baseIsKirbyIcon'>;

export const illustrations = {
  'calendar-money-arrow': {
    baseIsKirbyIcon: true,
    base: 'calendar',
    md: 'calender-money-arrows.md.svg',
  },
  'airballoon-wind': {
    baseIsKirbyIcon: true,
    base: 'air-balloon',
    md: 'airballoon.wind.md.svg',
  },
  'box-curve': {
    md: 'box-curve-dot.md.svg',
  },
  'investboard-money': {
    baseIsKirbyIcon: true,
    base: 'banknotes',
    md: 'investboard-money.md.svg',
  },
  'investboard-papers': {
    baseIsKirbyIcon: true,
    base: 'budget',
    md: 'investboard-papers.md.svg',
  },
  'piggy-bank': {
    baseIsKirbyIcon: true,
    base: 'piggybank',
    md: 'piggy-bank.md.svg',
  },
  robot: {
    base: 'robot.md.svg',
    md: 'robot.md.svg',
  },
  miv: {
    base: 'miv.base.svg',
    sm: 'miv.sm.svg',
    md: 'miv.md.svg',
    lg: 'miv.lg.svg',
  },
} as const satisfies Record<string, Illustration>;

export type IllustrationName = keyof typeof illustrations | null;
