import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ModalNavigationService } from '@kirbydesign/designsystem/modal';

@Directive({
  selector: `[kirbyModalRouterLink]`,
})
export class ModalRouterLinkDirective implements OnInit {
  constructor(
    private modalNavigationService: ModalNavigationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.setAttribute('modal-router-link', '');
  }

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
