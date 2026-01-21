import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IonSegment, IonSegmentButton } from '@ionic/angular/standalone';

import { SegmentItem } from './segment-item';

export enum SegmentedControlMode {
  chip = 'chip',
  compactChip = 'compactChip',
  default = 'default',
}

@Component({
  imports: [IconComponent, BadgeComponent, IonSegment, IonSegmentButton],
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
  implements ControlValueAccessor, AfterViewInit
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
    // Update tabindex when items change (native buttons will be re-created)
    this.updateTabIndexesWhenReady();
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
      this.updateNativeButtonTabIndexes();
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
    const segmentButton = event.target as HTMLIonSegmentButtonElement;
    this.focusSegmentButton(segmentButton);
  }

  /**
   * Focus the native button inside an ion-segment-button.
   * This method handles shadow DOM boundaries by directly accessing the shadow root
   * to focus the native button, which is necessary when the component is nested
   * inside another shadow DOM (e.g., in a micro frontend or web component).
   */
  private focusSegmentButton(segmentButton: HTMLIonSegmentButtonElement): void {
    if (!segmentButton) return;

    // Try to focus the native button inside the shadow DOM directly
    // This works across nested shadow DOM boundaries where setFocus() may fail
    const nativeButton = segmentButton.shadowRoot?.querySelector('button');
    nativeButton?.focus();
  }

  /**
   * Get all native buttons from the ion-segment-buttons' shadow DOMs.
   */
  private getNativeButtons(): HTMLButtonElement[] {
    const segmentButtons =
      this.ionSegmentElement.nativeElement.querySelectorAll('ion-segment-button');
    const nativeButtons: HTMLButtonElement[] = [];

    segmentButtons.forEach((segmentButton) => {
      const nativeButton = segmentButton.shadowRoot?.querySelector('button');
      if (nativeButton) {
        nativeButtons.push(nativeButton);
      }
    });

    return nativeButtons;
  }

  /**
   * Update tabindex on native buttons to implement roving tabindex pattern.
   * Only the selected button (or first if none selected) should be in the tab order.
   */
  private updateNativeButtonTabIndexes(): void {
    const nativeButtons = this.getNativeButtons();
    if (nativeButtons.length === 0) return;

    const tabStopIndex = this.selectedIndex === -1 ? 0 : this.selectedIndex;

    nativeButtons.forEach((button, index) => {
      if (index === tabStopIndex) {
        button.removeAttribute('tabindex');
      } else {
        button.setAttribute('tabindex', '-1');
      }
    });
  }

  /**
   * Wait for native buttons to be available, then update tabindex.
   * Ionic components render asynchronously, so we poll until ready.
   */
  private updateTabIndexesWhenReady(): void {
    const tryUpdate = () => {
      const segmentButtons =
        this.ionSegmentElement.nativeElement.querySelectorAll('ion-segment-button');
      const nativeButtons = this.getNativeButtons();

      if (nativeButtons.length === segmentButtons.length && nativeButtons.length > 0) {
        this.updateNativeButtonTabIndexes();
      } else {
        requestAnimationFrame(tryUpdate);
      }
    };
    setTimeout(tryUpdate);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateTabIndexesWhenReady();
  }

  @HostListener('focusin')
  @HostListener('focusout')
  _onFocusInOut() {
    const hasFocus = this.ionSegmentElement.nativeElement.matches(':focus-within');
    console.log('hasFocus', hasFocus);
    if (!hasFocus) {
      this.onTouched();
      // When focus leaves, ensure the selected button is the tab stop
      this.updateNativeButtonTabIndexes();
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
      this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }
}
