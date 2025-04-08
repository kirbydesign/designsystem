import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SegmentItem } from './segment-item';

export enum SegmentedControlMode {
  chip = 'chip',
  compactChip = 'compactChip',
  default = 'default',
}

@Component({
  imports: [IconModule, BadgeComponent, CommonModule, IonSegment, IonSegmentButton],
  selector: 'kirby-segmented-control',
  templateUrl: './segmented-control.component.html',
  styleUrls: ['./segmented-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SegmentedControlComponent),
      multi: true,
    },
  ],
})
export class SegmentedControlComponent<TItem extends SegmentItem = SegmentItem>
  implements ControlValueAccessor
{
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

  private _items: TItem[] = [];
  get items(): TItem[] {
    return this._items;
  }

  @Input() set items(value: TItem[]) {
    this._items = value || [];
    this._value = this.items[this.selectedIndex];
    this.ensureIonSegmentSelected();
  }

  protected isDisabled = false;

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

        ionSelectEvent.emit({ value: this._value?.id });
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
        this.onChange(this.value);
        this.onTouched();
      });
    }
  }

  focusNativeButton(event: UIEvent) {
    (event.target as HTMLIonSegmentButtonElement)?.setFocus();
  }

  private _segmentElementHasFocus = false;

  getTabIndex(item: TItem, index: number) {
    // When focused prevent tab stop from inner native button to outer ion-segment-button:
    if (this._segmentElementHasFocus) return -1;
    // Allow tab stop on selected item:
    if (item.id === this.value?.id) return null;
    // Allow tab stop on first item if no value is set:
    if (!this.value && index === 0) return null;
    // Prevent tab stop on all other items:
    return -1;
  }

  @HostListener('focusin')
  @HostListener('focusout')
  _onFocusInOut() {
    // @HostListener(focusin|focusout) triggers Change Detection and updates attr.tabindex on each ion-segment-button
    this._segmentElementHasFocus = this.ionSegmentElement.nativeElement.matches(':focus-within');
    if (!this._segmentElementHasFocus) {
      this.onTouched();
    }
  }

  // Initialize default ControlValueAccessor callback functions (noop)
  // eslint-disable-next-line no-empty-function
  private onChange: (value: NoInfer<TItem>) => void = () => {};
  // eslint-disable-next-line no-empty-function
  private onTouched: () => void = () => {};
  /**
   * Sets the segmented control's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: NoInfer<TItem>): void {
    if (value !== this._value) {
      this.value = value;
    }
  }

  /**
   * Saves a callback function to be invoked when the segmented control's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (value: NoInfer<TItem>) => void): void {
    this.onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the segmented control is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Disables the segmented control. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
