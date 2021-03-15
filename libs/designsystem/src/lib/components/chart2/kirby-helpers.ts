export enum KirbyColor {
  PRIMARY = '--kirby-primary',
  PRIMARY_CONTRAST = '--kirby-primary-contrast',
  PRIMARY_TINT = '--kirby-primary-tint',
  PRIMARY_SHADE = '--kirby-primary-shade',

  SECONDARY = '--kirby-secondary',
  SECONDARY_CONTRAST = '--kirby-secondary-contrast',
  SECONDARY_TINT = '--kirby-secondary-tint',
  SECONDARY_SHADE = '--kirby-secondary-shade',

  TERTIARY = '--kirby-tertiary',
  TERTIARY_CONTRAST = '--kirby-tertiary-contrast',
  TERTIARY_TINT = '--kirby-tertiary-tint',
  TERTIARY_SHADE = '--kirby-tertiary-shade',

  SUCCESS = '--kirby-success',
  SUCCESS_CONTRAST = '--kirby-success-contrast',
  SUCCESS_TINT = '--kirby-success-tint',
  SUCCESS_SHADE = '--kirby-success-shade',

  WARNING = '--kirby-warning',
  WARNING_CONTRAST = '--kirby-warning-contrast',
  WARNING_TINT = '--kirby-warning-tint',
  WARNING_SHADE = '--kirby-warning-shade',

  DANGER = '--kirby-danger',
  DANGER_CONTRAST = '--kirby-danger-contrast',
  DANGER_TINT = '--kirby-danger-tint',
  DANGER_SHADE = '--kirby-danger-shade',

  BACKGROUND_COLOR = '--kirby-background-color',
  BACKGROUND_COLOR_CONTRAST = '--kirby-background-color-contrast',
  BACKGROUND_COLOR_TINT = '--kirby-background-color-tint',
  BACKGROUND_COLOR_SHADE = '--kirby-background-color-shade',

  TEXT_WHITE = '--kirby-text-color-white',
  TEXT_SEMI_DARK = '--kirby-text-color-semi-dark',
  TEXT_BLACK = '--kirby-text-color-black',
  TEXT_DANGER = '--kirby-text-color-danger',
}

export function readKirbyColor(
  document: Document,
  colorName: string | null | undefined
): string | null | undefined {
  if (typeof colorName !== 'string') {
    return colorName;
  }
  const color: string = getComputedStyle(document.documentElement)
    .getPropertyValue(colorName)
    .trim();

  return color !== '' ? color : null;
}

export function readKirbyColorFromElement(
  element: HTMLElement,
  colorName: string | null | undefined
): string | null | undefined {
  if (typeof colorName !== 'string') {
    return colorName;
  }
  const color: string = getComputedStyle(element)
    .getPropertyValue(colorName)
    .trim();

  return color !== '' ? color : null;
}

export class KirbyIntegration {
  public getSettings(element: HTMLElement): any {
    const colorPoint = readKirbyColorFromElement(element, KirbyColor.PRIMARY);
    const colorGraph = readKirbyColorFromElement(element, KirbyColor.TERTIARY);
    const colorDatalabelsFont = readKirbyColorFromElement(element, KirbyColor.TERTIARY_CONTRAST);
    const colorTooltip = readKirbyColorFromElement(element, KirbyColor.BACKGROUND_COLOR);
    const colorGrid = readKirbyColorFromElement(element, KirbyColor.BACKGROUND_COLOR_SHADE);
    const colorFont = readKirbyColorFromElement(element, KirbyColor.TEXT_SEMI_DARK);
    return { colorPoint, colorGraph, colorDatalabelsFont, colorTooltip, colorGrid, colorFont };
  }

  public getSettingsFromDocument(document: Document): any {
    const colorPoint = readKirbyColor(document, KirbyColor.PRIMARY);
    const colorGraph = readKirbyColor(document, KirbyColor.TERTIARY);
    const colorDatalabelsFont = readKirbyColor(document, KirbyColor.TERTIARY_CONTRAST);
    const colorTooltip = readKirbyColor(document, KirbyColor.BACKGROUND_COLOR);
    const colorGrid = readKirbyColor(document, KirbyColor.BACKGROUND_COLOR_SHADE);
    const colorFont = readKirbyColor(document, KirbyColor.TEXT_SEMI_DARK);
    return { colorPoint, colorGraph, colorDatalabelsFont, colorTooltip, colorGrid, colorFont };
  }
  public getColorFromDocument(document: Document, category: string): string {
    const color = readKirbyColor(document, category);
    return color;
  }
}

export function getKirbyColor(category: KirbyColor): string {
  return new KirbyIntegration().getColorFromDocument(window.document, category);
}
