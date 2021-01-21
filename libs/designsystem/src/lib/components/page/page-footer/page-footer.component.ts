import { Component, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';

import { PageComponent } from '../page.component';

@Component({
  selector: 'kirby-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent implements OnDestroy {
  @Input()
  @HostBinding('class.padding')
  hasPadding: boolean = true;

  constructor(private pageComponent: PageComponent, private host: ElementRef<HTMLElement>) {}

  close() {
    this.pageComponent.hideTabs = false;
    this.host.nativeElement.remove();
  }

  ngOnDestroy(): void {
    this.pageComponent.hideTabs = false;
  }
}
