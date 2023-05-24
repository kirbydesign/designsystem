import { Directive, HostListener, Input } from '@angular/core';
import { Params } from '@angular/router';
import { AlertConfig, ModalNavigationService } from '@kirbydesign/designsystem/modal';

@Directive({
  selector: `[kirbyModalRouterLink]`,
})
export class ModalRouterLinkDirective {
  constructor(private modalNavigationService: ModalNavigationService) {}

  @Input('kirbyModalRouterLink') path: string | string[];
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyModalQueryParams') queryParams?: Params;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyAlertConfig') alertConfig?: AlertConfig;

  @HostListener('click')
  onClick(): boolean {
    this.modalNavigationService.navigateToModal(
      this.path,
      typeof this.queryParams !== 'string' ? this.queryParams : null,
      this.alertConfig || null
    );
    return false;
  }
}
