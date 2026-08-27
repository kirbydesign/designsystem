import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { CardComponent } from './card.component';

describe('CardThemeColorDirective', () => {
  let spectator: SpectatorDirective<ThemeColorDirective>;

  const createDirective = createDirectiveFactory({
    directive: ThemeColorDirective,
    imports: [CardComponent],
  });

  const renderCard = (themeColor: string): HTMLElement => {
    spectator = createDirective(`<kirby-card themeColor="${themeColor}"></kirby-card>`);
    return spectator.element as HTMLElement;
  };

  it('should apply "kirby-surface-base" for the default (no value) theme color', () => {
    expect(renderCard('')).toHaveClass('kirby-surface-base');
  });

  it('should apply "kirby-surface-base" for the "light" theme color', () => {
    expect(renderCard('light')).toHaveClass('kirby-surface-base');
  });

  ['primary', 'secondary', 'tertiary', 'dark'].forEach((themeColor) => {
    it(`should apply "kirby-surface-brand" for the "${themeColor}" theme color`, () => {
      const cardElement = renderCard(themeColor);
      expect(cardElement).toHaveClass('kirby-surface-brand');
      expect(cardElement).not.toHaveClass('kirby-surface-base');
    });
  });

  it('should apply "kirby-surface-raised" for the "white" theme color', () => {
    expect(renderCard('white')).toHaveClass('kirby-surface-raised');
  });
});
