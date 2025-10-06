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
    md: 'airballoon.wind.ballon-part.cloud.medium.svg',
  },
  'banknotes-arrow': {
    md: 'banknotes.arrow.dot.circle.medium.svg',
  },
  'bell-attention': {
    md: 'bell.exclamation-mark.triangle.bars.medium.svg',
  },
  'bell-checkmark': {
    xl: 'bell.checkmark.dot.bars.xlarge.svg',
  },
  'box-add': {
    lg: 'box.none.plus-dot.bars.large.svg',
  },
  'box-curve': {
    md: 'box.curve.box.half-circle.medium.md.svg',
  },
  'calculator-money': {
    md: 'calculator.money.coin.rectangle.medium.svg',
  },
  'calendar-loop-magnify': {
    lg: 'calender.loop-arrow.zoom.bars.large.svg',
    xl: 'calender.loop-arrow.zoom.bars.xlarge.svg',
  },
  'calendar-money': {
    md: 'calendar.money.coin.bars.medium.svg',
  },
  'calendar-money-arrows': {
    md: 'calender.money-arrows.header.bars.medium.svg',
    lg: 'calender.money-arrows.header.bars.large.svg',
  },
  'checkmark-success': {
    lg: 'checkmark.circle.circle-part.shadow.large.svg',
  },
  'computer-certificate': {
    lg: 'computer.certificate.padlock.circle.large.svg',
  },
  'cross-alert': {
    lg: 'cross.circle.circle-part.shadow.large.svg',
  },
  'exclamation-warning': {
    lg: 'exclamation-mark.circle.circle-part.shadow.large.svg',
  },
  'hand-balloon': {
    xl: 'hand.balloon.balloon.circle.xlarge.svg',
  },
  'hand-money': {
    md: 'hand-money.line.money-dot.bars.medium.svg',
  },
  'invest-page': {
    md: 'invest-page.money.dot.circle.medium.svg',
  },
  'invest-document': {
    md: 'invest-document.graph.bars.square.medium.svg',
    xl: 'invest-document.graph.bars.square.xlarge.svg',
  },
  megaphone: {
    xl: 'megaphone.sound.megaphone-part.circle.xlarge.svg',
  },
  money: {
    md: 'money.none.coin.bars.medium.svg',
  },
  'money-arrow': {
    md: 'money.arrow.coin.bars.medium.svg',
  },
  'piggy-bank': {
    md: 'piggy-bank.money.money-dot.bars.medium.svg',
  },
  'plant-leaf': {
    md: 'plant.bars.leaf.bars.medium.svg',
  },
  robot: {
    md: 'robot.none.antenna-dot.body.medium.svg',
    lg: 'robot.none.antenna-dot.body.large.svg',
  },
} as const satisfies Record<string, Illustration>;

export type SpotIllustrationName = keyof typeof illustrations | null;
