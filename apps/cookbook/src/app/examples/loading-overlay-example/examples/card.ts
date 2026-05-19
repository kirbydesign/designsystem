import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { SharedLoadingOverlayBase } from './shared-loading-overlay';

const config = {
  selector: 'cookbook-loading-overlay-example-card',
  template: `<kirby-loading-overlay [hideContent]="hideContent" [isLoading]="isLoading"  [showBackdrop]="showBackdrop">
  <kirby-card [hasPadding]="true">
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="showWrapperLoadingOverlay(true, true)"
    >
      Show wrapper loading overlay that hides card content
    </button>
  </kirby-card>
    <kirby-card [hasPadding]="true">
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="showWrapperLoadingOverlay(false, true)"
    >
      Show wrapper loading overlay on card with backdrop
    </button>
  </kirby-card>
</kirby-loading-overlay>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [LoadingOverlayComponent, ButtonComponent, CardComponent],
})
export class CardExampleComponent extends SharedLoadingOverlayBase {
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
  template: string = config.template;
}
