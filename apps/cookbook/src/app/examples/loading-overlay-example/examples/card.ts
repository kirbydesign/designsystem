import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-loading-overlay-example-card',
  template: `<kirby-loading-overlay [hideContent]="hideContent" [isLoading]="isLoading"  [showBackdrop]="showBackdrop">
  <kirby-card [hasPadding]="true">
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="showCardLoadingOverlay(true, true)"
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
      (click)="showCardLoadingOverlay(false, true)"
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
export class CardExampleComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  template: string = config.template;
  public isLoading = false;
  public hideContent = false;
  public showBackdrop = false;

  public showCardLoadingOverlay(hideContent: boolean, showBackdrop: boolean) {
    this.hideContent = hideContent;
    this.showBackdrop = showBackdrop;
    this.isLoading = true;
    setTimeout(() => {
      this.hideLoadingOverlay();
    }, 3000);
  }

  public hideLoadingOverlay() {
    this.isLoading = false;
    this.cdr.detectChanges();
  }
}
