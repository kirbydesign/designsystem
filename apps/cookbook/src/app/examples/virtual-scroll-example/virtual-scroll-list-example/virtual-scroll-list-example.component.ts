import { Component } from '@angular/core';

import { PageModule } from '@kirbydesign/designsystem/page';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { ListModule } from '@kirbydesign/designsystem/list';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { BaseListComponent } from '../../list-shared/base-list.component';

@Component({
  selector: 'cookbook-virtual-scroll-list-example',
  templateUrl: './virtual-scroll-list-example.component.html',
  styleUrls: ['./virtual-scroll-list-example.component.scss'],
  imports: [
    PageModule,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    ListModule,
    CdkVirtualForOf,
    ItemModule,
  ],
})
export class VirtualScrollListExampleComponent extends BaseListComponent {}
