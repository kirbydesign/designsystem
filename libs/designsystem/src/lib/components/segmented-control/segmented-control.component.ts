import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, IconRegistryService } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

import { IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { SegmentItem, SegmentItemInternal } from './segment-item';

export enum SegmentedControlMode {
  chip = 'chip',
  compactChip = 'compactChip',
  default = 'default',
}

@Component({
  standalone: true,
  imports: [IconModule, BadgeComponent, CommonModule, IonSegment, IonSegmentButton],
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { role: 'group' },
})
export class SegmentedControlComponent {
  constructor(private iconRegistryService: IconRegistryService) {}

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

  private _items: SegmentItemInternal[] = [];
  get items(): SegmentItemInternal[] {
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

  @Input() set selectedIndex(index: number) {
    if (index !== this._selectedIndex) {
      this._selectedIndex = index;
      this._value = this.items[this.selectedIndex];
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }

  @Output() selectedIndexChange = new EventEmitter<number>();

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
      setTimeout(() => {
        this.segmentSelect.emit(this.value);
      });
    }
  }
}
