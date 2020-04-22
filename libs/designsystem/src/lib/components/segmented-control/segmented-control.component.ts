import {
  Component,
  EventEmitter,
  Output,
  Input,
  HostBinding,
  AfterViewChecked,
} from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { role: 'group' },
})
export class SegmentedControlComponent implements AfterViewChecked {
  private isInitializing = false;

  @HostBinding('class.chip-mode')
  isChipMode: boolean;

  private _items: SegmentItem[] = [];
  get items(): SegmentItem[] {
    return this._items;
  }

  @Input() set items(value: SegmentItem[]) {
    // Flag to prevent emitting onSegmentSelect event if previous items exists
    // Is cleared in ngAfterViewChecked
    this.isInitializing = true;
    this._items = value || [];
    const checkedItemIndex = this.items.findIndex((item) => item.checked);
    if (checkedItemIndex > -1) {
      this._selectedIndex = checkedItemIndex;
    }
    this._value = this.items[this.selectedIndex];
  }

  private _selectedIndex: number = -1;
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input() set selectedIndex(value: number) {
    if (value !== this._selectedIndex) {
      this._selectedIndex = value;
      this._value = this.items[this.selectedIndex];
    }
  }

  private _value: SegmentItem;
  get value(): SegmentItem {
    return this._value;
  }

  @Input() set value(value: SegmentItem) {
    this.selectedIndex = this.items.indexOf(value);
  }

  @Input() set mode(mode: 'default' | 'chip') {
    this.isChipMode = mode === 'chip';
  }

  @HostBinding('class.sm')
  isSmallSize: boolean;

  @Input() set size(size: 'sm' | 'md') {
    this.isSmallSize = size === 'sm';
  }

  @Output() segmentSelect: EventEmitter<SegmentItem> = new EventEmitter();

  onSegmentSelect(item: SegmentItem) {
    if (!this.isInitializing) {
      if (item !== this.value) {
        this.value = item;
        this.segmentSelect.emit(this.value);
      }
    }
  }

  ngAfterViewChecked(): void {
    this.isInitializing = false;
  }
}
