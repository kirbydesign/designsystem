import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

import { IconRegistryService } from '../icon/icon-registry.service';

import { SegmentItem, SegmentItemInternal } from './segment-item';

export enum SegmentedControlMode {
  chip = 'chip',
  compactChip = 'compactChip',
  default = 'default',
}

@Component({
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { role: 'group' },
})
export class SegmentedControlComponent {
  constructor(private iconRegistryService: IconRegistryService) {}

  preventWrapperClick(event: Event) {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('segment-btn-wrapper')) {
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

  private _items: SegmentItemInternal[] = [];
  get items(): SegmentItem[] {
    return this._items;
  }

  @Input() set items(value: SegmentItem[]) {
    this._items = value || [];
    this._items.forEach((item) => {
      if (!item.badge) return;
      // We need to verify whether badges icon is custom or default, so we can check for it in the template
      item.badge.isCustomIcon =
        item.badge.icon !== undefined &&
        this.iconRegistryService.getIcon(item.badge.icon) !== undefined;
    });
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

  @Output() segmentSelect: EventEmitter<SegmentItem> = new EventEmitter();

  onSegmentSelect(selectedId: string) {
    const selectedItemIndex = this.items.findIndex((item) => selectedId === item.id);
    if (selectedItemIndex !== this.selectedIndex) {
      this.selectedIndex = selectedItemIndex;
      this.segmentSelect.emit(this.value);
    }
  }

  // Similar to Ionic's getSegmentButton()
  // See https://github.com/ionic-team/ionic-framework/blob/main/core/src/components/segment/segment.tsx#L440-L456
  getSegmentItem(selector: 'first' | 'last' | 'next' | 'previous'): SegmentItem {
    switch (selector) {
      case 'first':
        return this.items[0];
      case 'last':
        return this.items[this.items.length - 1];
      case 'next':
        return this.items[this.selectedIndex + 1] || this.items[0];
      case 'previous':
        return this.items[this.selectedIndex - 1] || this.items[this.items.length - 1];
      default:
        return null;
    }
  }

  // TODO: Implement function that makes element with id = itemID receive focus
  moveFocusToSegmentItem(itemId: string) {
    // something like element.focus();
    console.log(`Move focus to segment item with id = ${itemId}`);
  }

  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _onArrowKeys(event: KeyboardEvent) {
    // Only chip and compact chip modes - Ionic 6 will handle default mode
    if (this.mode === SegmentedControlMode.default) {
      return;
    }

    console.log(`${event.code} was pressed`);

    // TODO: Write unit tests

    let current: SegmentItem;

    // TODO: Mimic functionality from Ionic
    // See https://github.com/ionic-team/ionic-framework/blob/main/core/src/components/segment/segment.tsx#L458-L487

    // TODO: Consider handling RTL

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        current = this.getSegmentItem('next');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        current = this.getSegmentItem('previous');
        break;
      case 'Home':
        event.preventDefault();
        current = this.getSegmentItem('first');
        break;
      case 'End':
        event.preventDefault();
        current = this.getSegmentItem('last');
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
      // The following line only works if we first move focus to the chip segment
      // that we have navigated to using the arrow keys.
      // current = document.activeElement as HTMLIonSegmentButtonElement;
      // keyDownSelectsButton = true;
      default:
        break;
    }

    // TODO: Consider to handle Escape key down => blur()

    // TODO: Expose option to selectOnFocus similar to Ionic
    // See https://github.com/ionic-team/ionic-framework/blob/main/core/src/components/segment/segment.tsx#L93-L97

    // TODO: Let highlighted/current element receive focus
    this.moveFocusToSegmentItem(current.id);

    // TODO: Only select segment on "submit" i.e. Enter or Space
    // (unless selectOnFocus is implemented and is set to true)
    this.onSegmentSelect(current.id);
  }
}
