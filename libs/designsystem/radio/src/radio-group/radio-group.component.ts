import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Component, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';

import { RadioComponent } from '../radio.component';

@Component({
  selector: 'kirby-radio-group',
  templateUrl: './radio-group.component.html',
  styles: ['ion-radio-group { display: inherit; flex-wrap: inherit}'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements AfterContentInit, ControlValueAccessor {
  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  // #region public properties

  get disabled(): boolean {
    return this._disabled;
  }

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.setProjectedRadiosDisabledState(value);
  }

  @HostBinding('class.error') // Used to style radios with error state
  @Input()
  hasError: boolean = false;

  get items(): string[] | any[] {
    return this._items || []; // Ensure items return empty array even if set to null/undefined
  }

  @Input() set items(value: string[] | any[]) {
    if ((!value || !value.length) && !this.items.length) return; // Nothing changed, no items before or after
    this._items = value;
    this.refreshSelectionState();
  }

  @Input()
  itemTextProperty = 'text';

  @Input()
  itemDisabledProperty = 'disabled';

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input() set selectedIndex(value: number) {
    if (typeof value === 'string') value = parseInt(value); // Ensure data type number, e.g. when used with template syntax without binding: <... selectedIndex="1"
    // eslint-disable-next-line use-isnan
    if (value === undefined || value === null || Number.isNaN(value)) value = -1;
    if (value === this.selectedIndex) return;
    this._selectedIndex = value;
    this._value = this.getValueFromSelectedIndex() || null;
  }

  get value(): string | any {
    return this._value;
  }

  @Input() set value(value: string | any) {
    this.setSelectedItem(value);
  }

  private get hasValue(): boolean {
    return this.value !== undefined && this.value !== null;
  }

  /**
   * Emitted when an option is selected
   */
  @Output() valueChange: EventEmitter<string | any> = new EventEmitter<string | any>();
  // #endregion public properties

  // #region "protected" properties used by template
  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  _customItemTemplate: TemplateRef<any>;
  // #endregion "protected" properties used by template

  // #region private fields
  private _disabled = false;
  private _items: string[] | any[] = [];
  private _onChangeCallback: (value: any) => void = () => {};
  private _onTouched = () => {};
  private _selectedIndex: number = -1;
  private _value?: string | any = null;
  @ViewChildren(RadioComponent)
  private radioButtons: QueryList<RadioComponent>;
  @ContentChildren(RadioComponent, { descendants: true })
  private projectedRadioButtons: QueryList<RadioComponent>;

  private get hasItemsFromContentProjection(): boolean {
    return (
      !this.items.length &&
      !this._customItemTemplate &&
      this.projectedRadioButtons &&
      this.projectedRadioButtons.length > 0
    );
  }

  // #endregion private fields

  // #region public methods
  focus() {
    const findFocusable = (radios: QueryList<RadioComponent>) =>
      radios && radios.find((radio) => !isNaN(radio.buttonTabIndex) && radio.buttonTabIndex !== -1);
    const focusable = findFocusable(this.radioButtons) || findFocusable(this.projectedRadioButtons);
    focusable && focusable.focus();
  }

  ngAfterContentInit(): void {
    this.initSelectionStateFromProjectedContent();
    this.listenForProjectedRadiosChange();
  }

  registerOnChange(fn: any): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.changeDetectionRef.markForCheck();
  }

  writeValue(value: any): void {
    this.value = value;
    this.changeDetectionRef.markForCheck();
  }

  // #endregion public methods

  // #region "protected" methods used by template
  _getTextFromItem(item: string | any): string {
    if (!item) return null;
    return typeof item === 'string' ? item : item[this.itemTextProperty];
  }

  _getDisabledStateFromItem(item: string | any): boolean {
    if (!item) return undefined;
    return typeof item === 'string' ? undefined : item[this.itemDisabledProperty];
  }

  get _hasItems(): boolean {
    return this.items.length > 0 || this.hasItemsFromContentProjection;
  }

  _onChange(value: string | any) {
    if (value === this._value) return;
    this.setSelectedItem(value);
    this.valueChange.emit(value);
    this._onChangeCallback(value);
  }

  @HostListener('ionBlur')
  _onRadioBlur() {
    this._onTouched();
  }

  // #endregion "protected" methods used by template

  // #region private methods
  private getIndexOfSelectedValue() {
    if (!this.hasValue) return -1;
    return this.hasItemsFromContentProjection
      ? this.getIndexOfProjectedRadio(this.value)
      : this.items.indexOf(this.value);
  }

  private getIndexOfProjectedRadio(value: string | any): number {
    let selectedIndex = -1;
    this.projectedRadioButtons &&
      this.projectedRadioButtons.find((radio, i) => {
        const found = radio.value === value;
        if (found) {
          selectedIndex = i;
        }
        return found;
      });
    return selectedIndex;
  }

  private getValueFromSelectedIndex(): string | any {
    if (this.selectedIndex === -1) return;
    return this.hasItemsFromContentProjection
      ? this.getValueFromProjectedRadios(this.selectedIndex)
      : this.items[this.selectedIndex];
  }

  private getValueFromProjectedRadios(index: number): string | any {
    const radio =
      this.projectedRadioButtons &&
      this.projectedRadioButtons.find((_, i) => {
        return i === index;
      });
    return radio && radio.value;
  }

  private initSelectionStateFromProjectedContent() {
    if (this.hasItemsFromContentProjection) {
      this.refreshSelectionState(); // Initialize selected index and value from projected radios
    }
  }

  private listenForProjectedRadiosChange() {
    this.projectedRadioButtons.changes.subscribe(() => {
      this.refreshStateFromProjectedContent();

      if (this.disabled) {
        // Ensure disabled state propagates when re-rendering projected radios.
        // setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError when updating the DOM in QueryList.changes:
        setTimeout(() => this.setProjectedRadiosDisabledState(this.disabled));
      }
    });
  }

  private refreshSelectionState() {
    if (this.hasValue) {
      this._selectedIndex = this.getIndexOfSelectedValue(); // Ensure selectedIndex reflects value within items
    }

    const valueFromSelectedIndex = this.getValueFromSelectedIndex();
    this._value = valueFromSelectedIndex !== undefined ? valueFromSelectedIndex : null;
  }

  private refreshStateFromProjectedContent() {
    if (this._customItemTemplate) return; // Only refresh on changes to projected content, not when re-rendering custom template
    this.changeDetectionRef.markForCheck(); // Ensure changes to projected content gets checked in next change detection cycle
    this.refreshSelectionState(); // Sync selected index and value from projected radios
  }

  private setSelectedItem(value: string | any) {
    if (value === this._value) return; // Nothing changed
    this._value = value;
    this._selectedIndex = this.getIndexOfSelectedValue();
  }

  private setProjectedRadiosDisabledState(isDisabled: boolean) {
    if (!this.projectedRadioButtons || !this.projectedRadioButtons.length) return;
    this.projectedRadioButtons.forEach((radio, index) => {
      // Disable all radios when group is disabled, otherwise fall back to each item's disabled state, if defined:
      radio.disabled = isDisabled || this._getDisabledStateFromItem(this.items[index]);
    });
  }

  // #endregion private methods
}
