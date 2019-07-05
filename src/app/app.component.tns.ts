import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { FpsService } from './services/fps.service.tns-only';

@Component({
  selector: 'kirby-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Kirby design system';
  showFpsMeter = true;
  fps: Observable<string>;
  minFps: Observable<string>;

  constructor(private fpsService: FpsService) {
    this.fps = fpsService.fps;
    this.minFps = fpsService.minFps;
  }

  resetFps() {
    this.fpsService.reset();
  }

  hideFpsMeter() {
    this.showFpsMeter = false;
  }
}
