import { Component, Input, OnDestroy, Optional, Renderer2, SkipSelf } from '@angular/core';

import { PageComponent } from '../page.component';

@Component({
  selector: 'kirby-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent implements OnDestroy {
  @Input()
  hasPadding: boolean = true;

  constructor(
    @Optional() @SkipSelf() private pageComponent: PageComponent,
    private renderer: Renderer2
  ) {
    if (!pageComponent) {
      throw new Error('Page footer must reside inside of a Kirby page');
    }
  }

  close() {
    this.pageComponent.tabBarBottomHidden = false;
    this.renderer.destroy();
  }

  ngOnDestroy(): void {
    this.pageComponent.tabBarBottomHidden = false;
  }
}
