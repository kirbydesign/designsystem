import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';

const getColor = DesignTokenHelper.getColor;
const size = DesignTokenHelper.size;
describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;
  let cardElement: HTMLElement;

  const createHost = createHostFactory({
    component: CardComponent,
    imports: [TestHelper.ionicModuleForTest, CardHeaderComponent],
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
        'border-color': getColor('medium'),
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

      expect(contentWrapperElement).toHaveComputedStyle({
        'border-block-end-color': getColor('medium'),
        'border-block-end-style': 'solid',
        'border-block-end-width': '1px',

        'border-inline-start-color': getColor('medium'),
        'border-inline-start-style': 'solid',
        'border-inline-start-width': '1px',

        'border-inline-end-color': getColor('medium'),
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
