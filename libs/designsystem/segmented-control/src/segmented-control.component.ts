import {
  AfterViewChecked,
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
  QueryList,
  ViewChild,
  ViewChildren,
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
  implements AfterViewChecked, AfterViewInit, ControlValueAccessor
{
  @ViewChild(IonSegment, { static: true, read: ElementRef })
  private ionSegmentElement: ElementRef<HTMLIonSegmentElement>;

  @ViewChild('hiddenItems', { read: ElementRef })
  private hiddenItemsContainer?: ElementRef<HTMLDivElement>;

  @ViewChildren('projectedItemOutlet', { read: ElementRef })
  private projectedItemOutlets?: QueryList<ElementRef<HTMLDivElement>>;

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
    if (!this.hasProjectedItems) {
      this._value = this.items[this.selectedIndex];
    }
    this.ensureIonSegmentSelected();
  }

  projectedItems: HTMLElement[] = [];
  private projectedContentSynced = false;

  get hasProjectedItems(): boolean {
    return this.projectedItems.length > 0;
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
    const selectedSegmentValue = this.getSelectedSegmentValue();
    if (selectedSegmentValue !== undefined && typeof ionSelectEvent?.emit === 'function') {
      // Ensure changes has been reflected to the DOM:
      setTimeout(() => {
        const selectedSegmentButton = ionSegment.querySelector(
          'ion-segment-button.segment-button-checked'
        );
        if (selectedSegmentButton) return; // Nothing to patch

        ionSelectEvent.emit({ value: selectedSegmentValue });
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
      if (!this.hasProjectedItems) {
        this._value = this.items[this.selectedIndex];
      }
      this.selectedIndexChange.emit(this.selectedIndex);
      this.ensureIonSegmentSelected();
    }
  }

  @Output() selectedIndexChange = new EventEmitter<number>();

  private _value: NoInfer<TItem>;
  get value(): NoInfer<TItem> {
    return this._value;
  }

  @Input() set value(value: NoInfer<TItem> | number) {
    if (this.hasProjectedItems && typeof value === 'number') {
      this.selectedIndex = value;
      return;
    }

    this.selectedIndex = this.items.indexOf(value as NoInfer<TItem>);
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

  @Output() segmentSelect = new EventEmitter<TItem | number>();

  onSegmentSelect(selectedId: string) {
    if (this.hasProjectedItems) {
      const selectedItemIndex = parseInt(selectedId, 10);

      if (!isNaN(selectedItemIndex) && selectedItemIndex !== this.selectedIndex) {
        this.selectedIndex = selectedItemIndex;
        this.segmentSelect.emit(this.selectedIndex);
        this.onChange(this.selectedIndex);
        this.onTouched();
      }
      return;
    }

    const selectedItemIndex = this.items.findIndex((item) => selectedId === item.id);

    if (selectedItemIndex !== this.selectedIndex) {
      this.selectedIndex = selectedItemIndex;
      this.segmentSelect.emit(this.value);
      this.onChange(this.value);
      this.onTouched();
    }
  }

  focusNativeButton(event: UIEvent) {
    (event.target as HTMLIonSegmentButtonElement)?.setFocus();
  }

  private _segmentElementHasFocus = false;

  getTabIndex(index: number, item?: TItem) {
    // When focused prevent tab stop from inner native button to outer ion-segment-button:
    if (this._segmentElementHasFocus) return -1;
    if (this.hasProjectedItems) {
      if (index === this.selectedIndex) return null;
      if (this.selectedIndex < 0 && index === 0) return null;
      return -1;
    }
    // Allow tab stop on selected item:
    if (item?.id === this.value?.id) return null;
    // Allow tab stop on first item if no value is set:
    if (!this.value && index === 0) return null;
    // Prevent tab stop on all other items:
    return -1;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.projectedItems = Array.from(
      this.hiddenItemsContainer?.nativeElement.querySelectorAll('li') || []
    );

    if (this.hasProjectedItems) {
      this._value = undefined;
      this.projectedContentSynced = false;
      this.ensureIonSegmentSelected();
      this.cdr.markForCheck();
    }
  }

  ngAfterViewChecked() {
    if (this.hasProjectedItems && !this.projectedContentSynced) {
      this.projectedContentSynced = this.syncProjectedItemContent();
    }
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
  private onChange: (value: NoInfer<TItem> | number) => void = () => {};
  // eslint-disable-next-line no-empty-function
  private onTouched: () => void = () => {};
  /**
   * Sets the segmented control's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: NoInfer<TItem> | number): void {
    if (this.hasProjectedItems && typeof value === 'number') {
      if (value !== this.selectedIndex) {
        this.selectedIndex = value;
        this.cdr.markForCheck();
      }
      return;
    }

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
  registerOnChange(fn: (value: NoInfer<TItem> | number) => void): void {
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

  getSelectedSegmentValue(): string | number | undefined {
    if (this.hasProjectedItems) {
      return this.selectedIndex >= 0 ? this.selectedIndex : undefined;
    }

    return this.value?.id;
  }

  private syncProjectedItemContent(): boolean {
    const projectedItemOutlets = this.projectedItemOutlets?.toArray() || [];
    if (projectedItemOutlets.length !== this.projectedItems.length) {
      return false;
    }

    projectedItemOutlets.forEach((outletRef, index) => {
      const outlet = outletRef.nativeElement;
      const projectedItem = this.projectedItems[index];
      const childNodes = Array.from(projectedItem.childNodes);

      outlet.replaceChildren();
      childNodes.forEach((childNode) => outlet.appendChild(childNode));
    });

    return true;
  }
}
