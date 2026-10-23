import { ToastController } from '@ionic/angular/standalone';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { Overlay } from '@kirbydesign/designsystem/modal';
import { ToastHelper } from './toast.helper';

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
      const messageTypes = ['success', 'warning'] as const;

      messageTypes.forEach((messageType) => {
        it(`should pass the '${messageType}' css class to ionic toast`, async () => {
          const toastController = spectator.inject(ToastController);
          const createSpy = spyOn(toastController, 'create').and.callThrough();

          overlay = await spectator.service.showToast({
            message: 'Test Message',
            messageType: messageType,
          });

          expect(createSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({ cssClass: `kirby-toast ${messageType}` })
          );
        });
      });

      describe('when configured with durationInMs', () => {
        it('should pass durationInMs to ionic toast', async () => {
          const toastController = spectator.inject(ToastController);
          const createSpy = spyOn(toastController, 'create').and.callThrough();

          overlay = await spectator.service.showToast({
            message: testMessage,
            messageType: 'success',
            durationInMs: 2000,
          });

          expect(createSpy).toHaveBeenCalledWith(jasmine.objectContaining({ duration: 2000 }));
        });

        it('should pass durationInMs: 0 to ionic toast (no auto-dismiss)', async () => {
          const toastController = spectator.inject(ToastController);
          const createSpy = spyOn(toastController, 'create').and.callThrough();

          overlay = await spectator.service.showToast({
            message: testMessage,
            messageType: 'success',
            durationInMs: 0,
          });

          expect(createSpy).toHaveBeenCalledWith(jasmine.objectContaining({ duration: 0 }));
        });

        it('should use default duration when durationInMs is not specified', async () => {
          const toastController = spectator.inject(ToastController);
          const createSpy = spyOn(toastController, 'create').and.callThrough();

          overlay = await spectator.service.showToast({
            message: testMessage,
            messageType: 'success',
          });

          expect(createSpy).toHaveBeenCalledWith(
            jasmine.objectContaining({ duration: ToastHelper.DURATION_IN_MS })
          );
        });
      });
    });
  });
});
