import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ActionSheetItem } from '@kirbydesign/designsystem';

@Component({
  template: `
    <kirby-page [title]="title | async" [hideTabs]="hideTabs">
      <kirby-page-content>
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
        <button kirby-button (click)="toggleTabBar()">Toggle tab bar</button>
      </kirby-page-content>
      <kirby-page-footer>
        <div class="footer-content">
          This is the fixed footer
        </div>
      </kirby-page-footer>
    </kirby-page>
  `,
  styles: [
    `
      .footer-content {
        display: block;
      }
    `,
  ],
})
export class PageFixedFooterTabExampleComponent implements OnInit {
  hideTabs = false;
  title: Observable<string>;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.title = of(this.route.snapshot.data.title);
    }, 300);
  }

  toggleTabBar() {
    this.hideTabs = !this.hideTabs;
  }
}
