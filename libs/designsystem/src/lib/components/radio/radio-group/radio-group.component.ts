import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Component, Input } from '@angular/core';

import { ListItemTemplateDirective } from '../../list/list.directive';
import { RadioComponent } from '../radio.component';

@Component({
  selector: 'kirby-radio-group',
  templateUrl: './radio-group.component.html',
  styles: ['ion-radio-group { display: inherit; flex-wrap: inherit}'],
})
export class RadioGroupComponent implements AfterContentInit, AfterViewInit {
  // #region public properties

  get disabled(): boolean {
    return this._disabled;
  }

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.setDisabledState(disabled);
  }

  get items(): string[] | any[] {
    return this._items || []; // Ensure items return empty array even if set to null/undefined
  }

  @Input() set items(items: string[] | any[]) {
    this._items = items;
    if (this.value) {
      this._selectedIndex = this.items.indexOf(this.value); // Ensure selectedIndex reflects value within new items
    }
    this._value = this.items[this.selectedIndex] || null;
  }

  @Input()
  itemTextProperty = 'text';

  @Input()
  itemDisabledProperty = 'disabled';

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input() set selectedIndex(index: number) {
    if (index === this._selectedIndex) return;
    this._selectedIndex = index;
    this._value = this.getValueFromSelectedIndex() || null;
  }

  get value(): string | any {
    return this._value;
  }

  @Input() set value(value: any) {
    this.setSelectedItem(value);
  }

  /**
   * Emitted when an option is selected
   */
  @Output() valueChange: EventEmitter<string | any> = new EventEmitter<string | any>();

  // #endregion public properties

  // #region "protected" properties used by template
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  _itemTemplate: TemplateRef<any>;
  // #endregion "protected" properties used by template

  // #region private fields
  private _disabled = false;
  private _items: string[] | any[] = [];
  private _selectedIndex: number = -1;
  private _value: string | any = null;
  @ViewChildren(RadioComponent)
  private radioButtons: QueryList<RadioComponent>;
  @ContentChildren(RadioComponent, { descendants: true })
  private slottedRadioButtons: QueryList<RadioComponent>;
  // #endregion private fields

  // #region public methods
  ngAfterContentInit(): void {
    if (this.value) return;
    // Ensure value is initialized from selectedIndex if not already set explicitly:
    this._value = this.getValueFromSelectedIndex() || null;
  }

  ngAfterViewInit() {
    // Ensure disabled state propagates when re-rendering radios.
    // setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError when updating the DOM in QueryList.changes:
    this.radioButtons.changes.subscribe(() => this.setDisabledNextCycle());
    this.slottedRadioButtons.changes.subscribe(() => this.setDisabledNextCycle());
  }

  setDisabledState(isDisabled: boolean) {
    this.setRadioDisabledState(this.radioButtons, isDisabled);
    this.setRadioDisabledState(this.slottedRadioButtons, isDisabled);
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

  _onChange(value: any) {
    if (value === this._value) return;
    this.setSelectedItem(value);
    this.valueChange.emit(value);
  }
  // #endregion "protected" methods used by template

  // #region private methods
  private getValueFromSelectedIndex() {
    if (this.items.length) {
      return this.items && this.items[this.selectedIndex]; // Get value from items
    }
    const selectedRadio =
      this.slottedRadioButtons && this.slottedRadioButtons.toArray()[this.selectedIndex];
    return selectedRadio && selectedRadio.value; // Get value from slotted radios
  }

  private setDisabledNextCycle() {
    if (this.disabled) {
      setTimeout(() => this.setDisabledState(this.disabled));
    }
  }

  private setRadioDisabledState(radioButtons: QueryList<RadioComponent>, isDisabled: boolean) {
    if (!radioButtons || !radioButtons.length) return;
    radioButtons.forEach((radio, index) => {
      let disableRadio = isDisabled;
      if (isDisabled === false) {
        disableRadio = this._getDisabledStateFromItem(this.items[index]); // Ensure each item's disabled state overwrite radio-group state, if defined
      }
      radio.disabled = disableRadio;
    });
  }

  private setSelectedItem(value: any) {
    if (value === this._value) return;
    this._value = value;
    this._selectedIndex = this.items.indexOf(value);
  }
  // #endregion private methods
}
