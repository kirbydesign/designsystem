import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';

const OUTLINE_COLOR = 'rgb(209, 209, 209)';

describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;

  const createHost = createHostFactory({
    component: CardComponent,
    declarations: [CardHeaderComponent],
    imports: [TestHelper.ionicModuleForTest],
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
    let cardElement: HTMLElement;

    beforeEach(() => {
      spectator = createHost(`<kirby-card backgroundImageUrl='${testUrl}'></kirby-card>`);
      cardElement = spectator.queryHost('kirby-card');
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
    let cardElement: HTMLElement;

    beforeEach(() => {
      spectator = createHost('<kirby-card variant="flat"></kirby-card>');
      cardElement = spectator.queryHost('kirby-card');
    });

    it('should have no box-shadow', () => {
      expect(cardElement).toHaveComputedStyle({
        'box-shadow': 'none',
      });
    });
  });

  describe('with outlined variant attribute', () => {
    let cardElement: HTMLElement;

    beforeEach(() => {
      spectator = createHost('<kirby-card variant="outlined"></kirby-card>');
      cardElement = spectator.queryHost('kirby-card');
    });

    it('should have default styles', () => {
      expect(cardElement).toHaveComputedStyle({
        'box-shadow': 'none',
        'background-color': 'transparent',
        'outline-color': OUTLINE_COLOR,
        'outline-style': 'solid',
        'outline-width': '1px',
      });
    });
  });

  describe('with outlined variant attribute and flagged header', () => {
    let cardElement: HTMLElement;

    beforeEach(() => {
      spectator = createHost(
        '<kirby-card variant="outlined"><kirby-card-header flagged="warning"></kirby-card-header></kirby-card>'
      );
      cardElement = spectator.queryHost('kirby-card');
    });

    it('should have default styles', () => {
      const contentWrapperElement = spectator.queryHost('.content-wrapper');

      expect(contentWrapperElement).toHaveComputedStyle({
        'border-block-end-color': OUTLINE_COLOR,
        'border-block-end-style': 'solid',
        'border-block-end-width': '1px',

        'border-inline-start-color': OUTLINE_COLOR,
        'border-inline-start-style': 'solid',
        'border-inline-start-width': '1px',

        'border-inline-end-color': OUTLINE_COLOR,
        'border-inline-end-style': 'solid',
        'border-inline-end-width': '1px',

        'border-bottom-left-radius': '16px',
        'border-bottom-right-radius': '16px',
      });

      expect(cardElement).toHaveComputedStyle({
        'box-shadow': 'none',
        'background-color': 'transparent',
        'outline-style': 'none',
      });
    });
  });
});
