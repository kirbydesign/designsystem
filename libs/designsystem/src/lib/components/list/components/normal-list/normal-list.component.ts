import { Component, ViewChild } from '@angular/core';

import { ListComponent } from '../../list.component';
import { SlidingItemComponent } from '../sliding-item/sliding-item.component';

@Component({
  selector: 'kirby-normal-list',
  templateUrl: './normal-list.component.html',
  styleUrls: ['../../list.component.scss'],
})
export class NormalListComponent {
  @ViewChild(SlidingItemComponent) slidingItem: SlidingItemComponent;
  constructor(public listComponent: ListComponent) {}
}
