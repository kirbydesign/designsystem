import { Component } from '@angular/core';
import { FpsService } from './services/fps.service.tns-only';
import { Observable } from 'rxjs';

@Component({
  selector: 'kirby-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Kirby design system';
  fps: Observable<string>;
  minFps: Observable<string>;

  constructor(fpsService: FpsService) {
    this.fps = fpsService.fps;
    this.minFps = fpsService.minFps;
  }
}
