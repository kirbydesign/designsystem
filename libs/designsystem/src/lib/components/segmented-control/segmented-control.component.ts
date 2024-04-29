import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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

  @ViewChild(IonSegment, { static: true, read: ElementRef })
  private ionSegmentElement: ElementRef<HTMLIonSegmentElement>;

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
    this.ensureIonSegmentSelected();
  }

  /**
   * After upgrading to Ionic standalone components (Ionic v.7.6.6)
   * there is a lifecycle bug between Angular/Ionic/Stencil that prevents
   * the value of the segment component to be reflected in the checked state
   * of it's slotted segment buttons.
   * This has been patched here: https://github.com/ionic-team/ionic-framework/pull/28837
   * However the patch doesn't fix the problem if `items` are updated after first initialization
   * and the ion-segment-button(s) are re-rerendered.
   */
  private ensureIonSegmentSelected() {
    const ionSegment = this.ionSegmentElement.nativeElement;
    const ionSelectEvent = ionSegment['ionSelect'];
    if (this._value && typeof ionSelectEvent?.emit === 'function') {
      // Ensure changes has been reflected to the DOM:
      setTimeout(() => {
        const selectedSegmentButton = ionSegment.querySelector(
          'ion-segment-button.segment-button-checked'
        );
        if (selectedSegmentButton) return; // Nothing to patch

        ionSelectEvent.emit({ value: this._value.id });
      });
    }
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
