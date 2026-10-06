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
  'airballoon.wind.ballon-part.cloud': {
    md: 'airballoon.wind.ballon-part.cloud.medium.svg',
  },
  'banknotes.arrow.dot.circle': {
    md: 'banknotes.arrow.dot.circle.medium.svg',
  },
  'bell.checkmark.dot.bars': {
    xl: 'bell.checkmark.dot.bars.xlarge.svg',
  },
  'bell.exclamation-mark.triangle.bars': {
    md: 'bell.exclamation-mark.triangle.bars.medium.svg',
  },
  'box.curve.box.half-circle': {
    md: 'box.curve.box.half-circle.medium.svg',
  },
  'box.none.plus-dot.bars': {
    lg: 'box.none.plus-dot.bars.large.svg',
  },
  'calculator.money.coin.rectangle': {
    md: 'calculator.money.coin.rectangle.medium.svg',
  },
  'calendar.money.coin.bars': {
    md: 'calendar.money.coin.bars.medium.svg',
  },
  'calender.loop-arrow.zoom.bars': {
    lg: 'calender.loop-arrow.zoom.bars.large.svg',
    xl: 'calender.loop-arrow.zoom.bars.xlarge.svg',
  },
  'calender.money-arrows.header.bars': {
    md: 'calender.money-arrows.header.bars.medium.svg',
    lg: 'calender.money-arrows.header.bars.large.svg',
  },
  'checkmark.circle.circle-part.shadow': {
    lg: 'checkmark.circle.circle-part.shadow.large.svg',
  },
  'computer.certificate.padlock.circle': {
    lg: 'computer.certificate.padlock.circle.large.svg',
  },
  'cross.circle.circle-part.shadow': {
    lg: 'cross.circle.circle-part.shadow.large.svg',
  },
  'device.arrow-download.dot.circle': {
    xl: 'device.arrow-download.dot.circle.xlarge.svg',
  },
  'document.card.dot.circle': {
    lg: 'document.card.dot.circle.large.svg',
  },
  'exclamation-mark.circle.circle-part.shadow': {
    lg: 'exclamation-mark.circle.circle-part.shadow.large.svg',
  },
  'graph.coins.dot.bars': {
    md: 'graph.coins.dot.bars.medium.svg',
  },
  'hand-money.line.money-dot.bars': {
    md: 'hand-money.line.money-dot.bars.medium.svg',
  },
  'hand.balloon.balloon.circle': {
    xl: 'hand.balloon.balloon.circle.xlarge.svg',
  },
  'hand.moneybag.ribbon.circle': {
    lg: 'hand.moneybag.ribbon.circle.large.svg',
  },
  'house.plant.door.bars': {
    md: 'house.plant.door.bars.medium.svg',
  },
  'invest-document.graph.bars.square': {
    md: 'invest-document.graph.bars.square.medium.svg',
    lg: 'invest-document.graph.bars.square.large.svg',
    xl: 'invest-document.graph.bars.square.xlarge.svg',
  },
  'invest-page.money.dot.circle': {
    md: 'invest-page.money.dot.circle.medium.svg',
  },
  'letters.arrow.triangle.circle': {
    lg: 'letters.arrow.triangle.circle.large.svg',
  },
  'megaphone.sound.megaphone-part.circle': {
    xl: 'megaphone.sound.megaphone-part.circle.xlarge.svg',
  },
  'money-coinstack.graphline.topcoin.bars': {
    md: 'money-coinstack.graphline.topcoin.bars.medium.svg',
  },
  'money-notes.shield.heart.circle': {
    md: 'money-notes.shield.heart.circle.medium.svg',
  },
  'money.arrow.coin.bars': {
    md: 'money.arrow.coin.bars.medium.svg',
  },
  'money.none.coin.bars': {
    md: 'money.none.coin.bars.medium.svg',
  },
  'moneybag.money-notes.dot.bars': {
    md: 'moneybag.money-notes.dot.bars.medium.svg',
  },
  'piggy-bank.money.money-dot.bars': {
    md: 'piggy-bank.money.money-dot.bars.medium.svg',
  },
  'plant.bars.leaf.bars': {
    md: 'plant.bars.leaf.bars.medium.svg',
  },
  'robot.none.antenna-dot.body': {
    md: 'robot.none.antenna-dot.body.medium.svg',
    lg: 'robot.none.antenna-dot.body.large.svg',
  },
  'template.plus.dot.circle': {
    xl: 'template.plus.dot.circle.xlarge.svg',
  },
  'wallet.face-coins.star.circle': {
    lg: 'wallet.face-coins.star.circle.large.svg',
  },
} as const satisfies Record<string, Illustration>;

export type SpotIllustrationName = keyof typeof illustrations | null;
