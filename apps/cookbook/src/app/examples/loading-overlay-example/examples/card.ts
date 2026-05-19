import { Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';

export const template = `<kirby-loading-overlay [hideContent]="true" [isLoading]="isLoading">
  <kirby-card [hasPadding]="true">
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="showCardLoadingOverlay()"
    >
      Show card with loading overlay that hides content
    </button>
  </kirby-card>
</kirby-loading-overlay>`;

@Component({
  selector: 'cookbook-card-example',
  template: template,
  imports: [LoadingOverlayComponent, ButtonComponent, CardComponent],
})
export class CardExampleComponent {
  template: string = template;
  public isLoading = false;
  public showCardLoadingOverlay() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }
}
