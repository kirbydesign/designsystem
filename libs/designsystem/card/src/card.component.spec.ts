import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
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

const size = DesignTokenHelper.size;

/** Resolves a color token as seen from inside `element`, i.e. against the surface it establishes. */
const resolveSurfaceColor = (element: HTMLElement, token: string): string => {
  const probe = document.createElement('span');
  probe.style.color = `var(${token})`;
  element.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
};

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

  describe('with flat variant attribute', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-card variant="flat"></kirby-card>');
      cardElement = spectator.element;
    });

    it('should have no box-shadow', () => {
      expect(cardElement).toHaveComputedStyle({
        'box-shadow': 'none',
      });
    });
  });

  describe('with outlined variant attribute', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-card variant="outlined"></kirby-card>');
      cardElement = spectator.element;
    });

    it('should have default styles', () => {
      expect(cardElement).toHaveComputedStyle({
        'box-shadow': 'none',
        'background-color': 'transparent',
        'border-color': resolveSurfaceColor(cardElement, '--kirby-color-border-base-quiet'),
        'border-style': 'solid',
        'border-width': '1px',
      });
    });
  });

  describe('with no themeColor set', () => {
    it("should apply 'kirby-surface-raised' for the default (elevated) variant", () => {
      spectator = createHost('<kirby-card></kirby-card>');
      expect(spectator.element).toHaveClass('kirby-surface-raised');
    });

    it("should apply 'kirby-surface-raised' for the flat variant", () => {
      spectator = createHost('<kirby-card variant="flat"></kirby-card>');
      expect(spectator.element).toHaveClass('kirby-surface-raised');
    });

    it("should not apply 'kirby-surface-raised' for the outlined variant", () => {
      spectator = createHost('<kirby-card variant="outlined"></kirby-card>');
      expect(spectator.element).not.toHaveClass('kirby-surface-raised');
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

  describe('with outlined variant attribute and flagged header', () => {
    beforeEach(() => {
      spectator = createHost(
        '<kirby-card variant="outlined"><kirby-card-header flagged="warning"></kirby-card-header></kirby-card>'
      );
      cardElement = spectator.element;
    });

    it('should have default styles', () => {
      const contentWrapperElement = spectator.queryHost('.content-wrapper');
      const borderColor = resolveSurfaceColor(cardElement, '--kirby-color-border-base-quiet');

      expect(contentWrapperElement).toHaveComputedStyle({
        'border-block-end-color': borderColor,
        'border-block-end-style': 'solid',
        'border-block-end-width': '1px',

        'border-inline-start-color': borderColor,
        'border-inline-start-style': 'solid',
        'border-inline-start-width': '1px',

        'border-inline-end-color': borderColor,
        'border-inline-end-style': 'solid',
        'border-inline-end-width': '1px',

        'border-bottom-left-radius': size('s'),
        'border-bottom-right-radius': size('s'),
      });

      expect(cardElement).toHaveComputedStyle({
        'box-shadow': 'none',
        'background-color': 'transparent',
      });
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

  it('should not apply a surface for the default (no value) theme color on the outlined variant', () => {
    const cardElement = renderCard('', 'outlined');
    expect(cardElement).not.toHaveClass('kirby-surface-raised');
    expect(cardElement).not.toHaveClass('kirby-surface-base');
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
