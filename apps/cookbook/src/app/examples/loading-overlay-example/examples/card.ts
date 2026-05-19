import { Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { createExampleLoadingOverlayProps } from './shared-loading-overlay';

const config = {
  selector: 'cookbook-loading-overlay-example-card',
  template: `<kirby-loading-overlay [hideContent]="overlay.hideContent()" [isLoading]="overlay.isLoading()" [showBackdrop]="overlay.showBackdrop()">
  <kirby-card [hasPadding]="true">
      <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="overlay.show(true)"
    >
      Show wrapper loading overlay on card
    </button>
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="overlay.show(false, true)"
    >
      Show wrapper loading overlay that hides card
    </button>
  </kirby-card>
</kirby-loading-overlay>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./loading-overlay-example.shared.scss'],
  imports: [LoadingOverlayComponent, ButtonComponent, CardComponent],
})
export class CardExampleComponent {
  overlay = createExampleLoadingOverlayProps();
  template: string = config.template;
}
