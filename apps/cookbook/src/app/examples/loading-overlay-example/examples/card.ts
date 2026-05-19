import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingOverlayComponent } from '@kirbydesign/designsystem/loading-overlay';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-loading-overlay-example-card',
  template: `<kirby-loading-overlay [hideContent]="true" [isLoading]="isLoading">
  <kirby-card [hasPadding]="true">
    <button
      kirby-button
      attentionLevel="2"
      size="lg"
      expand="block"
      (click)="showCardLoadingOverlay()"
    >
      Show wrapper loading overlay that hides card content
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

  public showCardLoadingOverlay() {
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
