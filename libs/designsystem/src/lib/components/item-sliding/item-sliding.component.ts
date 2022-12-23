import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon';

import { ItemSlidingSide, ItemSwipeAction } from './item-sliding.types';

@Component({
  standalone: true,
  imports: [IconModule, IonicModule, CommonModule], // TODO: Figure out if all ionic need to be imported form this module,
  selector: 'kirby-item-sliding',
  templateUrl: './item-sliding.component.html',
  styleUrls: ['./item-sliding.component.scss'],
})
export class ItemSlidingComponent {
  @Input() swipeActions: ItemSwipeAction[];

  _side: 'start' | 'end' = 'start';
  @Input() set side(value: ItemSlidingSide) {
    this._side = value === 'left' ? 'start' : 'end';
  }

  get _hasSwipeActions(): boolean {
    // Using '>' instead of '!==';
    // will only return true when swipeActions is an array
    return this.swipeActions?.length > 0;
  }
}
