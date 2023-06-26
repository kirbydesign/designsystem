import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ActionSheetItem } from '@kirbydesign/designsystem';

@Component({
  template: `
    <kirby-page [title]="title | async">
      <kirby-page-actions *kirbyPageActions>
        <button kirby-button (click)="onCogSelect()">
          <kirby-icon name="cog"></kirby-icon>
        </button>
        <button kirby-button (click)="onMoreSelect()">
          <kirby-icon name="more"></kirby-icon>
        </button>
      </kirby-page-actions>
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
        <button kirby-button (click)="navigateToTransferSub()">Go to transfer sub</button>
      </kirby-page-content>

      <kirby-fab-sheet *kirbyPageContent="{ fixed: true }" horizontalAlignment="right">
        <kirby-icon name="write-message"></kirby-icon>
        <kirby-action-sheet
          header="Your action sheet header"
          subheader="Your action sheet subheader"
          [items]="items"
          (itemSelect)="onItemSelect($event)"
        ></kirby-action-sheet>
      </kirby-fab-sheet>
    </kirby-page>
  `,
  styleUrls: [],
})
export class TabExampleComponent implements OnInit {
  title: Observable<string>;
  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.title = of(this.route.snapshot.data.title);
      this.cdr.detectChanges();
    }, 300);
  }

  onItemSelect() {
    alert('item selected');
  }

  navigateToTransferSub() {
    this.router.navigate(['sub'], { relativeTo: this.route });
  }

  onCogSelect() {
    alert('On cog select');
  }

  onMoreSelect() {
    alert('On more select');
  }
}
