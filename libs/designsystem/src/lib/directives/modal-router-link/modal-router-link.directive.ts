import { Directive, HostListener, Input } from '@angular/core';
import { Params } from '@angular/router';
import { ModalNavigationService } from '@kirbydesign/designsystem/modal/internal';

@Directive({
  selector: `[kirbyModalRouterLink]`,
})
export class ModalRouterLinkDirective {
  constructor(private modalNavigationService: ModalNavigationService) {}

  @Input('kirbyModalRouterLink') path: string | string[];
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('kirbyModalQueryParams') queryParams?: Params;

  @HostListener('click')
  onClick(): boolean {
    this.modalNavigationService.navigateToModal(
      this.path,
      typeof this.queryParams !== 'string' ? this.queryParams : null
    );
    return false;
  }
}
