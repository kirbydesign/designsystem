import { JsonpClientBackend } from '@angular/common/http';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { SegmentItem } from './segment-item';

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { role: 'group' },
})
export class SegmentedControlComponent {
  preventWrapperClick(event: Event) {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('segment-btn-wrapper')) {
        event.stopImmediatePropagation();
      }
    }
  }

  @HostBinding('class.chip-mode')
  isChipMode: boolean;

  @HostBinding('class.sm')
  get isSmallSize(): boolean {
    return this.size === 'sm';
  }

  @HostBinding('class.transparent')
  get isTransparent(): boolean {
    return this.themeColor === 'transparent';
  }
  @Input()
  themeColor: 'white' | 'transparent' = 'white';

  private _items: SegmentItem[] = [];
  get items(): SegmentItem[] {
    return this._items;
  }

  @Input() set items(value: SegmentItem[]) {
    this._items = value || [];
    const checkedItemIndex = this.items.findIndex((item) => item.checked);
    if (checkedItemIndex > -1) {
      console.warn(
        'SegmentItem.checked is deprecated - please remove from your `items` configuration. Use `selectedIndex` or `value` on `<kirby-segmented-control>` instead '
      );
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

  @Input() size: 'sm' | 'md' = 'md';

  @Output() segmentSelect: EventEmitter<SegmentItem> = new EventEmitter();

  onSegmentSelect(selectedId: string) {
    const selectedItemIndex = this.items.findIndex((item) => selectedId === item.id);
    if (selectedItemIndex !== this.selectedIndex) {
      this.selectedIndex = selectedItemIndex;
      this.segmentSelect.emit(this.value);
    }
  }
}
