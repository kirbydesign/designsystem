import { Directive, HostListener, Input } from '@angular/core';

import { ModalNavigationService } from '../../components/modal/services/modal-navigation.service';

@Directive({
  selector: `[kirbyModalRouterLink]`,
})
export class ModalRouterLinkDirective {
  constructor(private modalNavigationService: ModalNavigationService) {}

  @Input('kirbyModalRouterLink') path: string | string[];

  @HostListener('click')
  onClick(): boolean {
    this.modalNavigationService.navigateToModal(this.path);
    return false;
  }
}
