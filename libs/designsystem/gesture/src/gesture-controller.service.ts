import { inject, Injectable } from '@angular/core';
import { GestureController as IonicGestureController } from '@ionic/angular/standalone';

import { Gesture, GestureConfig } from './gesture.types';

@Injectable()
export class GestureController {
  private readonly ionicGestureController = inject(IonicGestureController);

  create(config: GestureConfig, runInsideAngularZone = false): Gesture {
    return this.ionicGestureController.create(config, runInsideAngularZone);
  }
}
