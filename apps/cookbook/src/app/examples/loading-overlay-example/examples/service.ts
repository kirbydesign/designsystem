import { Component } from '@angular/core';
import { LoadingOverlayService } from '@kirbydesign/designsystem';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

export const template = `<button
  kirby-button
  attentionLevel="2"
  size="lg"
  expand="block"
  (click)="showFullscreenLoadingOverlay(true)"
>
  Show full page loading overlay
</button>
<button
  kirby-button
  attentionLevel="2"
  size="lg"
  expand="block"
  (click)="showFullscreenLoadingOverlay(false, true)"
>
  Show full page loading overlay that hides content
</button>
<button
  kirby-button
  attentionLevel="2"
  size="lg"
  expand="block"
  (click)="showFullscreenLoadingOverlay(false)"
>
  Show full page loading overlay without backdrop
</button>
`;

@Component({
  selector: 'cookbook-service-example',
  template: template,
  imports: [ButtonComponent],
})
export class ServiceExampleComponent {
  constructor(private loadingOverlayService: LoadingOverlayService) {}

  public showFullscreenLoadingOverlay(showBackdrop: boolean, hideContent?: boolean) {
    this.loadingOverlayService.showLoadingOverlay(showBackdrop, hideContent);

    setTimeout(() => {
      this.loadingOverlayService.hideLoadingOverlay();
    }, 5000);
  }
}
