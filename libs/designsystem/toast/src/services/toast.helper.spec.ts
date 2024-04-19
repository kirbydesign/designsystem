import { ToastController } from '@ionic/angular/standalone';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { Overlay } from '@kirbydesign/designsystem/modal';
import { ToastHelper } from './toast.helper';

const getDecorationColor = DesignTokenHelper.getDecorationColor;

describe('ToastHelper', () => {
  let spectator: SpectatorService<ToastHelper>;
  let overlay: Overlay;

  const createService = createServiceFactory({
    service: ToastHelper,
    imports: [TestHelper.ionicModuleForTest],
    providers: [ToastController],
  });

  beforeEach(() => {
    TestHelper.disableAnimationsInTest();
    spectator = createService();
  });

  afterEach(() => {
    if (overlay) {
      overlay.dismiss();
    }
  });

  describe('showToast', () => {
    const testMessage = 'Test Message';

    describe('by default', () => {
      let ionToast: HTMLIonToastElement;
      let toastMessage: Element;
      beforeEach(async () => {
        overlay = await spectator.service.showToast({
          message: testMessage,
          messageType: 'success',
        });

        ionToast = window.document.getElementsByTagName('ion-toast')[0];
        await TestHelper.whenReady(ionToast);
        toastMessage = ionToast.shadowRoot.querySelector('.toast-message');
      });

      it('should render a toast message', () => {
        expect(ionToast).toBeTruthy();
      });

      it('should render toast with the configured message text', () => {
        expect(toastMessage.textContent).toEqual(testMessage);
      });

      it('should render toast message with center aligned text xxx', () => {
        expect(toastMessage).toHaveComputedStyle({ 'text-align': 'center' });
      });
    });

    describe('when configured with messageType', () => {
      type MessageType = 'success' | 'warning';
      type ColorStep = [string, number];

      const messageTypeColorMap = new Map<MessageType, ColorStep>([
        ['success', ['green', 40]],
        ['warning', ['yellow', 40]],
      ]);

      messageTypeColorMap.forEach((notificationColor, messageType) => {
        it(`should render with correct background color for messageType = '${messageType}'`, async () => {
          overlay = await spectator.service.showToast({
            message: 'Test Message',
            messageType: messageType,
          });
          const ionToast = window.document.getElementsByTagName('ion-toast')[0];
          await TestHelper.whenReady(ionToast);
          const toastWrapper = ionToast.shadowRoot.querySelector('.toast-wrapper');

          expect(toastWrapper).toHaveComputedStyle({
            'background-color': getDecorationColor(...notificationColor).value,
          });
        });
      });
    });
  });
});
