import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/angular/standalone';
import { ItemSlidingSide, ItemSwipeAction } from './item-sliding.types';

@Component({
  standalone: true,
  imports: [IconModule, CommonModule, IonItemSliding, IonItemOptions, IonItemOption, IonLabel],
  selector: 'kirby-item-sliding',
  templateUrl: './item-sliding.component.html',
  styleUrls: ['./item-sliding.component.scss'],
})
export class ItemSlidingComponent {
  @ViewChild(IonItemSliding, { static: true }) itemSliding: IonItemSliding;
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

  onSwipeActionClick(swipeAction: ItemSwipeAction): void {
    swipeAction.onSelected();
    this.itemSliding.close();
  }
}
