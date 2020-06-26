import { Component, ViewChild } from '@angular/core';

import { ListComponent } from '../../list.component';
import { SlidingItemComponent } from '../sliding-item/sliding-item.component';

@Component({
  selector: 'kirby-virtual-scroll-list',
  templateUrl: './virtual-scroll-list.component.html',
  styleUrls: ['../../list.component.scss'],
})
export class VirtualScrollListComponent {
  @ViewChild(SlidingItemComponent) slidingItem: SlidingItemComponent;
  constructor(public listComponent: ListComponent) {}
}
