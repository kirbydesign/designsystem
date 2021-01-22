import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PageFooterComponent } from '@kirbydesign/designsystem/components/page/page-footer/page-footer.component';

const template = `
<kirby-page [title]="title" [hideTabs]="!showTabs">
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
      <h3>0 selected</h3>
      <button kirby-button attentionLevel="2" class="close-footer-btn" (click)="onCloseClick()">
        <kirby-icon name="close"></kirby-icon>
      </button>
      This is a fixed footer
  </kirby-page-footer>
</kirby-page>

<ng-template #controls>
  <kirby-card>
    <kirby-item>
      <h3>Show tabs</h3>
      <kirby-toggle slot="end" (click)="toggleTabs()" [checked]="showTabs"></kirby-toggle>
    </kirby-item>
    <kirby-item>
      <h3>Show footer</h3>
      <kirby-toggle slot="end" (click)="toggleFooter()" [checked]="showFooter"></kirby-toggle>
    </kirby-item>
  </kirby-card>
</ng-template>
`;
@Component({
  template,
  styles: [
    `
      .close-footer-btn {
        position: absolute;
        top: 8px;
        right: 16px;
        margin: 0;
      }
    `,
  ],
})
export class PageFixedFooterTabExampleComponent implements OnInit {
  static readonly template = template;

  @ViewChild(PageFooterComponent) pageFooter: PageFooterComponent;
  showTabs = true;
  showFooter = true;
  title: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data.title;
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
