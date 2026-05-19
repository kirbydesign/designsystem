import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

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
export class DefaultExampleComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  template: string = config.template;
  public isLoading = false;
  public showBackdrop = false;
  public hideContent = false;

  public showWrapperLoadingOverlay(showBackdrop: boolean, hideContent?: boolean) {
    this.showBackdrop = showBackdrop;
    this.hideContent = hideContent ?? false;
    this.isLoading = true;

    setTimeout(() => {
      this.hideLoadingOverlay();
    }, 3000);
  }

  public hideLoadingOverlay() {
    this.isLoading = false;
    this.showBackdrop = false;
    this.hideContent = false;
    this.cdr.detectChanges();
  }
}
