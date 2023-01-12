import { CardComponent } from '@kirbydesign/designsystem/card';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { ThemeColorDirective } from './theme-color.directive';

describe('ThemeColorDirective', () => {
  let spectator: SpectatorDirective<ThemeColorDirective>;

  const createDirective = createDirectiveFactory({
    directive: ThemeColorDirective,
    declarations: [CardComponent],
  });

  it('should define the directive instance when applied to a valid component', () => {
    spectator = createDirective('<kirby-card themeColor="primary"></kirby-card>');

    expect(spectator.directive).toBeDefined();
  });

  it('should add appropriate color brightness for white', () => {
    spectator = createDirective('<kirby-card themeColor="white"></kirby-card>');

    expect(spectator.element).toHaveClass('kirby-color-brightness-white');
  });

  it('should add appropriate color brightness for light', () => {
    spectator = createDirective('<kirby-card themeColor="light"></kirby-card>');

    expect(spectator.element).toHaveClass('kirby-color-brightness-light');
  });

  it('should add appropriate color brightness for dark', () => {
    spectator = createDirective('<kirby-card themeColor="dark"></kirby-card>');

    expect(spectator.element).toHaveClass('kirby-color-brightness-dark');
  });

  it('should add CSS Custom Property for theming background-color', () => {
    spectator = createDirective('<kirby-card themeColor="white"></kirby-card>');

    expect(
      getComputedStyle(spectator.element).getPropertyValue('--kirby-interactive-background-color')
    ).not.toBe('');
  });

  it('should add CSS Custom Property for theming color', () => {
    spectator = createDirective('<kirby-card themeColor="white"></kirby-card>');

    expect(
      getComputedStyle(spectator.element).getPropertyValue('--kirby-interactive-color')
    ).not.toBe('');
  });
});
