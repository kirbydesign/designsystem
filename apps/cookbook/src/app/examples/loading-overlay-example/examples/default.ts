import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { SharedLoadingOverlayBase } from './shared-loading-overlay';

const config = {
  selector: 'cookbook-loading-overlay-example-default',
  template: `<kirby-loading-overlay
  [isLoading]="isLoading"
  [showBackdrop]="showBackdrop"
  [hideContent]="hideContent"
>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="showWrapperLoadingOverlay(true)"
  >
    Show wrapper loading overlay
  </button>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="showWrapperLoadingOverlay(false, true)"
  >
    Show wrapper loading overlay that hides content
  </button>
  <button
    kirby-button
    attentionLevel="2"
    size="lg"
    expand="block"
    (click)="showWrapperLoadingOverlay(false)"
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
export class DefaultExampleComponent extends SharedLoadingOverlayBase {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
  template: string = config.template;
}
