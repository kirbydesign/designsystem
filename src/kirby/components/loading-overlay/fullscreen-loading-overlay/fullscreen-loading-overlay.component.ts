import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './fullscreen-loading-overlay.component.html',
  styleUrls: ['./fullscreen-loading-overlay.component.scss'],
})
export class FullscreenLoadingOverlayComponent {
  @Input() showBackdrop = true;
  constructor() {}
}
