import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ToastController as IonicToastController } from '@ionic/angular/standalone';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { Overlay } from '@kirbydesign/designsystem/modal';

import { ToastController } from './toast.controller';
import { ToastHelper } from './toast.helper';

describe('ToastController', () => {
  let spectator: SpectatorService<ToastController>;
  let overlay: Overlay;

  const createService = createServiceFactory({
    service: ToastController,
    imports: [TestHelper.ionicModuleForTest],
    providers: [ToastHelper, IonicToastController],
  });

  beforeEach(() => {
    TestHelper.disableAnimationsInTest();
    spectator = createService();
  });

  afterEach(async () => {
    if (overlay) {
      await overlay.dismiss();
    }
  });

  describe('showToast', () => {
    it('should return an Overlay', async () => {
      overlay = await spectator.service.showToast({
        message: 'Test message',
        messageType: 'success',
      });

      expect(overlay).toBeDefined();
      expect(overlay.dismiss).toBeDefined();
      expect(overlay.onDidDismiss).toBeDefined();
      expect(overlay.onWillDismiss).toBeDefined();
    });

    it('should call onCloseToast callback when toast is dismissed', async () => {
      const onCloseToast = jasmine.createSpy('onCloseToast');

      overlay = await spectator.service.showToast(
        {
          message: 'Test message',
          messageType: 'success',
        },
        onCloseToast
      );

      await overlay.dismiss();

      expect(onCloseToast).toHaveBeenCalled();
    });

    describe('dismiss', () => {
      it('should dismiss the toast programmatically', async () => {
        overlay = await spectator.service.showToast({
          message: 'Test message',
          messageType: 'success',
          durationInMs: 0,
        });

        const ionToast = document.querySelector('ion-toast');
        expect(ionToast).toBeTruthy();

        const dismissed = await overlay.dismiss();

        expect(dismissed).toBe(true);
      });

      it('should resolve onDidDismiss when toast is dismissed', async () => {
        overlay = await spectator.service.showToast({
          message: 'Test message',
          messageType: 'success',
          durationInMs: 0,
        });

        const onDidDismissSpy = jasmine.createSpy('onDidDismiss');
        overlay.onDidDismiss.then(onDidDismissSpy);

        await overlay.dismiss();

        expect(onDidDismissSpy).toHaveBeenCalled();
      });

      it('should resolve onWillDismiss before onDidDismiss', async () => {
        overlay = await spectator.service.showToast({
          message: 'Test message',
          messageType: 'success',
          durationInMs: 0,
        });

        const callOrder: string[] = [];
        overlay.onWillDismiss.then(() => callOrder.push('onWillDismiss'));
        overlay.onDidDismiss.then(() => callOrder.push('onDidDismiss'));

        await overlay.dismiss();
        // Wait for promises to resolve
        await overlay.onDidDismiss;

        expect(callOrder).toEqual(['onWillDismiss', 'onDidDismiss']);
      });
    });
  });
});
