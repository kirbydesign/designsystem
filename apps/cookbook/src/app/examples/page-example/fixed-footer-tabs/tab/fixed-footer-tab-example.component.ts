import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PageFooterComponent } from '@kirbydesign/designsystem/components/page/page-footer/page-footer.component';

const template = `
<kirby-page [title]="title | async" [hideTabs]="!showTabs">
  <kirby-page-content>
    <ng-container *ngTemplateOutlet="controls"></ng-container>
    <br />

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit
      officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero
      obcaecati odit quia soluta!
    </p>
    <ng-container *ngTemplateOutlet="controls"></ng-container>
  </kirby-page-content>
  <kirby-page-footer *ngIf="showFooter" #pageFooter>
    <div class="footer-content">
      <h3>0 selected</h3>
      <kirby-icon class="close-footer" name="close" (click)="onCloseClick()"></kirby-icon>
      This is a fixed footer
    </div>
  </kirby-page-footer>
</kirby-page>

<ng-template #controls>
  <kirby-item>
    <h3>Show tabs</h3>
    <kirby-toggle slot="end" (click)="toggleTabs()" [checked]="showTabs"></kirby-toggle>
  </kirby-item>
  <kirby-item>
    <h3>Show footer</h3>
    <kirby-toggle slot="end" (click)="toggleFooter()" [checked]="showFooter"></kirby-toggle>
  </kirby-item>
</ng-template>
`;
@Component({
  template,
  styles: [
    `
      .footer-content {
        display: block;
      }

      .close-footer {
        position: absolute;
        top: 8px;
        right: 16px;
      }
    `,
  ],
})
export class PageFixedFooterTabExampleComponent implements OnInit {
  static template = template;

  @ViewChild('pageFooter') pageFooter: PageFooterComponent;
  showTabs = true;
  showFooter = true;
  title: Observable<string>;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.title = of(this.route.snapshot.data.title);
    }, 300);
  }

  toggleTabs() {
    this.showTabs = !this.showTabs;
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  onCloseClick() {
    this.pageFooter.close();
    this.showFooter = false;
    this.showTabs = true;
  }
}
