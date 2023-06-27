import { createHostFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { IconComponent } from '@kirbydesign/designsystem/icon';

import { TabButtonComponent } from './tab-button.component';

const { getTextColor, fontSize, fontWeight, lineHeight, size } = DesignTokenHelper;

describe('TabsComponent', () => {
  let spectator: Spectator<TabButtonComponent>;
  let ionTabButton: HTMLIonTabButtonElement;
  let innerButton: HTMLAnchorElement;

  const createHost = createHostFactory({
    component: TabButtonComponent,
    imports: [TestHelper.ionicModuleForTest],
    declarations: [IconComponent],
    template: `<kirby-tab-button>Title</kirby-tab-button>`,
  });

  describe('by default', () => {
    beforeEach(async () => {
      spectator = createHost();
      ionTabButton = spectator.query('ion-tab-button');
      await TestHelper.whenReady(ionTabButton);
      ionTabButton.style.transition = 'none';
      innerButton = ionTabButton.shadowRoot.querySelector('[part=native]');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should set correct color on unselected tab', () => {
      expect(ionTabButton).toHaveComputedStyle({
        color: getTextColor('semi-dark'),
      });
    });

    it('should set correct color on selected tab', async () => {
      ionTabButton.selected = true;
      await TestHelper.whenTrue(() => ionTabButton.classList.contains('tab-selected'));

      expect(ionTabButton).toHaveComputedStyle({
        color: getTextColor('black'),
      });
    });

    describe('responsiveness', () => {
      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('on screensize phone', () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
        });

        it('should have correct padding', () => {
          expect(innerButton).toHaveComputedStyle({
            padding: '0px',
          });
        });

        it('should grow and shrink tab', () => {
          expect(ionTabButton).toHaveComputedStyle({
            'flex-basis': '0%',
            'flex-grow': '1',
            'flex-shrink': '1',
          });
        });

        it('should have correct typography', () => {
          expect(ionTabButton).toHaveComputedStyle({
            'font-weight': fontWeight('medium'),
            'font-size': fontSize('xs'),
            'line-height': lineHeight('xs'),
          });
        });
      });

      describe('on screensize tablet', () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);
        });

        it('should not grow or shrink tab', () => {
          expect(ionTabButton).toHaveComputedStyle({
            'flex-basis': 'auto',
            'flex-grow': '0',
            'flex-shrink': '0',
          });
        });

        it('should have correct padding', () => {
          expect(innerButton).toHaveComputedStyle({
            'padding-inline': size('m'),
            'padding-block': '0px',
          });
        });

        it('should have correct typography', () => {
          expect(ionTabButton).toHaveComputedStyle({
            'font-size': fontSize('s'),
            'line-height': lineHeight('s'),
          });
        });
      });
    });
  });

  describe('when configured with an icon', () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-tab-button>
                                <kirby-icon></kirby-icon>
                                Title
                              </kirby-tab-button>`);
      ionTabButton = spectator.query('ion-tab-button');
      await TestHelper.whenReady(ionTabButton);
      ionTabButton.style.transition = 'none';
      innerButton = ionTabButton.shadowRoot.querySelector('[part=native]');
    });

    describe('responsiveness', () => {
      afterAll(() => {
        TestHelper.resetTestWindow();
      });

      describe('on screensize phone', () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize.phone);
        });

        it('should render icon on top of text', () => {
          expect(innerButton).toHaveComputedStyle({
            'flex-direction': 'column',
          });
        });
      });

      describe('on screensize tablet', () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize.tablet);
        });

        it('should render icon next to text', () => {
          expect(innerButton).toHaveComputedStyle({
            'flex-direction': 'row',
          });
        });

        it('should render icon with correct margin', () => {
          const icon = ionTabButton.querySelector('kirby-icon');
          expect(icon).toHaveComputedStyle({
            'margin-right': size('xxs'),
          });
        });
      });

      describe('on screensize desktop', () => {
        beforeAll(async () => {
          await TestHelper.resizeTestWindow(TestHelper.screensize.desktop);
        });

        it('should have correct padding', () => {
          expect(innerButton).toHaveComputedStyle({
            'padding-inline': size('xs'),
            'padding-block': '0px',
          });
        });
      });
    });
  });
});
