import { Injectable, OnDestroy } from '@angular/core';
import * as fpsMeter from 'tns-core-modules/fps-meter';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FpsService implements OnDestroy {
  fps: BehaviorSubject<string> = new BehaviorSubject<string>('-');
  minFps: BehaviorSubject<string> = new BehaviorSubject<string>('-');

  constructor() {
    fpsMeter.addCallback((fps, minFps) => {
      this.fps.next(fps.toFixed(2));
      this.minFps.next(minFps.toFixed(2));
    });

    fpsMeter.start();
  }

  reset() {
    fpsMeter.stop();
    fpsMeter.start();
  }

  ngOnDestroy(): void {
    fpsMeter.stop();
    this.fps.complete();
    this.minFps.complete();
  }
}
