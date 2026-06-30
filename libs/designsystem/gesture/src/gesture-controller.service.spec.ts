import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GestureController as IonicGestureController } from '@ionic/angular/standalone';

import { GestureController } from './gesture-controller.service';
import { Gesture, GestureConfig } from './gesture.types';

describe('GestureController', () => {
  let spectator: SpectatorService<GestureController>;
  let ionicGestureController: jasmine.SpyObj<IonicGestureController>;
  let createdGesture: Gesture;

  const createService = createServiceFactory({
    service: GestureController,
    providers: [
      {
        provide: IonicGestureController,
        useFactory: () =>
          jasmine.createSpyObj<IonicGestureController>('IonicGestureController', ['create']),
      },
    ],
  });

  beforeEach(() => {
    spectator = createService();
    ionicGestureController = spectator.inject(
      IonicGestureController
    ) as jasmine.SpyObj<IonicGestureController>;
    createdGesture = {
      enable: jasmine.createSpy('enable'),
      destroy: jasmine.createSpy('destroy'),
    };
    ionicGestureController.create.and.returnValue(createdGesture);
  });

  describe('create', () => {
    const config: GestureConfig = {
      el: document.createElement('div'),
      gestureName: 'test-gesture',
    };

    it('should forward the config to the Ionic GestureController', () => {
      spectator.service.create(config);

      expect(ionicGestureController.create).toHaveBeenCalledWith(config, false);
    });

    it('should default runInsideAngularZone to false', () => {
      spectator.service.create(config);

      expect(ionicGestureController.create).toHaveBeenCalledWith(config, false);
    });

    it('should forward runInsideAngularZone when explicitly set to true', () => {
      spectator.service.create(config, true);

      expect(ionicGestureController.create).toHaveBeenCalledWith(config, true);
    });

    it('should return the Gesture created by the Ionic GestureController', () => {
      const result = spectator.service.create(config);

      expect(result).toBe(createdGesture);
    });
  });
});
