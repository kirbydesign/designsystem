import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import {
  createDirectiveFactory,
  createHostFactory,
  SpectatorDirective,
  SpectatorHost,
} from '@ngneat/spectator';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardAsButtonDirective } from './card-as-button/card-as-button.directive';

describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;
  let cardElement: HTMLElement;

  const createHost = createHostFactory({
    component: CardComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      CardHeaderComponent,
      CardAsButtonDirective,
      ThemeColorDirective,
    ],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-card></kirby-card>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });
  });

  describe("with 'backgroundImageUrl' set", () => {
    const testUrl = 'https://notarealurl/';

    beforeEach(() => {
      spectator = createHost(`<kirby-card backgroundImageUrl='${testUrl}'></kirby-card>`);
      cardElement = spectator.element;
    });

    it("should use the url for the 'background-image' property", () => {
      expect(cardElement).toHaveComputedStyle({
        'background-image': `url("${testUrl}")`,
      });
    });

    it('should have correct defaults for properties related to background', () => {
      expect(cardElement).toHaveComputedStyle({
        'background-repeat': 'no-repeat',
        'background-position': '50% 50%',
        'background-size': 'cover',
      });
    });
  });

  describe('with no themeColor set', () => {
    [
      { variant: 'elevated', surface: 'raised' },
      { variant: 'flat', surface: 'raised' },
      { variant: 'outlined', surface: 'base' },
      { variant: 'base', surface: 'base' },
      { variant: 'raised', surface: 'raised' },
      { variant: 'brand', surface: 'brand' },
    ].forEach(({ variant, surface }) => {
      it(`should make the '${variant}' variant a '${surface}' surface`, () => {
        spectator = createHost(`<kirby-card variant="${variant}"></kirby-card>`);
        const surfaceClasses = Array.from(spectator.element.classList).filter((c) =>
          c.startsWith('kirby-surface-')
        );
        expect(surfaceClasses).toEqual([`kirby-surface-${surface}`]);
      });
    });

    it("should make the default variant a 'raised' surface", () => {
      spectator = createHost('<kirby-card></kirby-card>');
      expect(spectator.element).toHaveClass('kirby-surface-raised');
    });

    it('should establish its own raised surface when nested inside a themed card', () => {
      spectator = createHost(
        '<kirby-card themeColor="light"><kirby-card></kirby-card></kirby-card>'
      );
      const nestedCard = spectator.query('kirby-card kirby-card');
      expect(nestedCard).toHaveClass('kirby-surface-raised');
      expect(nestedCard).not.toHaveClass('kirby-surface-base');
    });
  });
});

describe('CardThemeColorDirective', () => {
  let spectator: SpectatorDirective<ThemeColorDirective>;

  const createDirective = createDirectiveFactory({
    directive: ThemeColorDirective,
    imports: [CardComponent],
  });

  const renderCard = (themeColor: string, variant = 'elevated'): HTMLElement => {
    spectator = createDirective(
      `<kirby-card themeColor="${themeColor}" variant="${variant}"></kirby-card>`
    );
    return spectator.element as HTMLElement;
  };

  it('should apply "kirby-surface-raised" for the default (no value) theme color, like no theme color', () => {
    const cardElement = renderCard('');
    expect(cardElement).toHaveClass('kirby-surface-raised');
    expect(cardElement).not.toHaveClass('kirby-surface-base');
  });

  it('should apply "kirby-surface-base" for the default (no value) theme color on the outlined variant, like no theme color', () => {
    const cardElement = renderCard('', 'outlined');
    expect(cardElement).toHaveClass('kirby-surface-base');
    expect(cardElement).not.toHaveClass('kirby-surface-raised');
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
