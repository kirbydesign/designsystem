import { CardComponent } from '@kirbydesign/designsystem/card';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { ThemeColorDirective } from './theme-color.directive';

describe('ThemeColorDirective', () => {
  let spectator: SpectatorDirective<ThemeColorDirective>;

  const createDirective = createDirectiveFactory({
    directive: ThemeColorDirective,
    declarations: [CardComponent],
  });

  describe('when initialized', () => {
    beforeEach(() => {
      spectator = createDirective('<kirby-card themeColor="primary"></kirby-card>');
    });

    it('should define the directive instance when applied to a valid component', () => {
      expect(spectator.directive).toBeDefined();
    });

    it('should add CSS Custom Property for theming background-color', () => {
      expect(
        getComputedStyle(spectator.element).getPropertyValue('--kirby-inputs-background-color')
      ).not.toBe('');
    });

    it('should add CSS Custom Property for theming color', () => {
      expect(getComputedStyle(spectator.element).getPropertyValue('--kirby-inputs-color')).not.toBe(
        ''
      );
    });
  });

  it('should add color brightness class for white', () => {
    spectator = createDirective('<kirby-card themeColor="white"></kirby-card>');

    expect(spectator.element).toHaveClass('kirby-color-brightness-white');
  });

  it('should add color brightness class for light', () => {
    spectator = createDirective('<kirby-card themeColor="light"></kirby-card>');

    expect(spectator.element).toHaveClass('kirby-color-brightness-light');
  });

  it('should add color brightness class for dark', () => {
    spectator = createDirective('<kirby-card themeColor="dark"></kirby-card>');

    expect(spectator.element).toHaveClass('kirby-color-brightness-dark');
  });
});
