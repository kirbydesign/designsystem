import { Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { createExampleLoadingOverlayProps } from './shared-loading-overlay';

const config = {
  selector: 'cookbook-loading-overlay-example-default',
  template: `<kirby-loading-overlay
  [isLoading]="overlay.isLoading()"
  [showBackdrop]="overlay.showBackdrop()"
  [hideContent]="overlay.hideContent()"
>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="overlay.show(true)"
  >
    Show wrapper loading overlay
  </button>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="overlay.show(false, true)"
  >
    Show wrapper loading overlay that hides content
  </button>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="overlay.show(false)"
  >
    Show wrapper loading overlay without backdrop
  </button>
</kirby-loading-overlay>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./loading-overlay-example.shared.scss'],
  imports: [LoadingOverlayComponent, ButtonComponent],
})
export class DefaultExampleComponent {
  overlay = createExampleLoadingOverlayProps();
  template: string = config.template;
}
