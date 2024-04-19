import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ActionSheetItem, ToastConfig, ToastController } from '@kirbydesign/designsystem';

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
        <button *ngIf="showSubNavigation" kirby-button (click)="navigateToTransferSub()">
          Go to transfer sub
        </button>
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
})
export class TabExampleComponent implements OnInit {
  title: Observable<string>;
  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];
  showSubNavigation = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.showSubNavigation = this.route.snapshot.parent.routeConfig.path === 'transfer';
    setTimeout(() => {
      this.title = of(this.route.snapshot.data.title);
      this.cdr.detectChanges();
    }, 300);
  }

  onItemSelect(item: ActionSheetItem) {
    const config: ToastConfig = {
      message: `Item selected: ${item.text}`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  navigateToTransferSub() {
    this.router.navigate(['sub'], { relativeTo: this.route });
  }

  onCogSelect() {
    const config: ToastConfig = {
      message: `Cog clicked...`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }

  onMoreSelect() {
    const config: ToastConfig = {
      message: `More menu clicked...`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
