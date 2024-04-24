import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

import { IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { SegmentItem } from './segment-item';

export enum SegmentedControlMode {
  chip = 'chip',
  compactChip = 'compactChip',
  default = 'default',
}

// Workaround until TS 5.4 official NoInfer
// https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/NoInfer.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NoInfer<T> = [T][T extends any ? 0 : never];

@Component({
  standalone: true,
  imports: [IconModule, BadgeComponent, CommonModule, IonSegment, IonSegmentButton],
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { role: 'group' },
})
export class SegmentedControlComponent<TItem extends SegmentItem = SegmentItem> {
  /**
   * Ensure that the click actually did originate from within the segment-button.
   * We do not want to react to clicks on e.g. segment-btn-wrapper or badge.
   */
  preventOutsideClick(event: TouchEvent) {
    if (event.target instanceof HTMLElement) {
      const targetIsInSegmentBtn = !!event.target.closest('ion-segment-button');
      if (!targetIsInSegmentBtn) {
        event.stopImmediatePropagation();
      }
    }
  }

  @Input() mode: SegmentedControlMode | `${SegmentedControlMode}` = SegmentedControlMode.default;

  @HostBinding('class')
  get _modeCssClass() {
    return {
      [SegmentedControlMode.chip]: 'chip-mode',
      [SegmentedControlMode.default]: 'default-mode',
      [SegmentedControlMode.compactChip]: 'compact chip-mode',
    }[this.mode];
  }

  private _items: TItem[] = [];
  get items(): TItem[] {
    return this._items;
  }

  @Input() set items(value: TItem[]) {
    this._items = value || [];
    this._value = this.items[this.selectedIndex];
  }

  private _selectedIndex: number = -1;
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input() set selectedIndex(index: number) {
    if (index !== this._selectedIndex) {
      this._selectedIndex = index;
      this._value = this.items[this.selectedIndex];
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }

  @Output() selectedIndexChange = new EventEmitter<number>();

  private _value: NoInfer<TItem>;
  get value(): NoInfer<TItem> {
    return this._value;
  }

  @Input() set value(value: NoInfer<TItem>) {
    this.selectedIndex = this.items.indexOf(value);
  }

  @HostBinding('class.sm')
  isSmallSize: boolean;

  @Input() set size(size: 'sm' | 'md') {
    this.isSmallSize = size === 'sm';
  }

  private _disableChangeOnSwipe: boolean = false;
  get disableChangeOnSwipe(): boolean {
    return this._disableChangeOnSwipe;
  }

  @Input() set disableChangeOnSwipe(value: boolean) {
    this._disableChangeOnSwipe = value;
  }

  @Output() segmentSelect = new EventEmitter<TItem>();

  onSegmentSelect(selectedId: string) {
    const selectedItemIndex = this.items.findIndex((item) => selectedId === item.id);

    if (selectedItemIndex !== this.selectedIndex) {
      this.selectedIndex = selectedItemIndex;
      setTimeout(() => {
        this.segmentSelect.emit(this.value);
      });
    }
  }
}
