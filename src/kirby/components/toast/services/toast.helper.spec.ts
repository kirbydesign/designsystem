import { ToastController, IonicModule } from '@ionic/angular';
import { createService } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../../helpers/design-token-helper';
import { TestHelper } from '../../../testing/test-helper';
import { ToastHelper } from './toast.helper';

const getColor = DesignTokenHelper.getColor;

describe('toastHelper', () => {
  let toastHelper: ToastHelper;

  const spectator = createService({
    service: ToastHelper,
    imports: [IonicModule.forRoot()],
    providers: [ToastController],
  });

  beforeEach(() => {
    toastHelper = spectator.service;
  });

  describe('showToast', () => {
    const testMessage = 'Test Message';

    describe('by default', () => {
      let ionToast: HTMLIonToastElement;
      let toastMessage: Element;
      beforeEach(async () => {
        await toastHelper.showToast({
          message: testMessage,
          messageType: 'success',
          durationInMs: 1,
          animated: false,
        });
        ionToast = window.document.getElementsByTagName('ion-toast')[0];
        await TestHelper.whenHydrated(ionToast);
        toastMessage = ionToast.shadowRoot.querySelector('.toast-message');
      });

      it('should render a toast message', () => {
        expect(ionToast).toBeTruthy();
      });

      it('should render toast with the configured message text', () => {
        expect(toastMessage.textContent).toEqual(testMessage);
      });

      it('should render toast message with center aligned text', () => {
        expect(toastMessage).toHaveComputedStyle({ 'text-align': 'center' });
      });
    });

    describe('when configured with messageType', () => {
      type MessageType = 'success' | 'warning' | 'danger';
      type NotificationColor = 'success' | 'warning' | 'danger';

      const messageTypeColorMap = new Map<MessageType, NotificationColor>([
        ['success', 'success'],
        ['warning', 'warning'],
        ['danger', 'danger'],
      ]);

      messageTypeColorMap.forEach((notificationColor, messageType) => {
        it(
          'should render with correct background color for messageType = ' + messageType,
          async () => {
            await toastHelper.showToast({
              message: 'Test Message',
              messageType: messageType,
              durationInMs: 1,
              animated: false,
            });
            const ionToast = window.document.getElementsByTagName('ion-toast')[0];
            expect(ionToast).toBeTruthy();

            await TestHelper.whenHydrated(ionToast);
            const toastWrapper = ionToast.shadowRoot.querySelector('.toast-wrapper');
            expect(toastWrapper).toHaveComputedStyle({
              'background-color': getColor(notificationColor),
            });
          }
        );
      });
    });
  });
});
