import { Directive, HostListener, Input } from '@angular/core';
import { Params } from '@angular/router';

import { ModalNavigationService } from '../../components/modal/services/modal-navigation.service';

@Directive({
  selector: `[kirbyModalRouterLink]`,
})
export class ModalRouterLinkDirective {
  constructor(private modalNavigationService: ModalNavigationService) {}

  @Input('kirbyModalRouterLink') path: string | string[];
  // tslint:disable-next-line:no-input-rename
  @Input('kirbyModalQueryParams') queryParams: Params | null;

  @HostListener('click')
  onClick(): boolean {
    this.modalNavigationService.navigateToModal(
      this.path,
      typeof this.queryParams !== 'string' ? this.queryParams : null
    );
    return false;
  }
}
