import { ContentChild, EventEmitter, Output, TemplateRef } from '@angular/core';
import { Component, Input } from '@angular/core';

import { ListItemTemplateDirective } from '../../list/list.directive';

@Component({
  selector: 'kirby-radio-group',
  templateUrl: './radio-group.component.html',
})
export class RadioGroupComponent {
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  private _items: string[] | any[] = [];
  get items(): string[] | any[] {
    return this._items;
  }

  @Input() set items(value: string[] | any[]) {
    this._items = value;
    this._selectedIndex = this.items.indexOf(this.value);
    this._value = this.items[this.selectedIndex] || null;
  }

  private _selectedIndex: number = -1;
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input() set selectedIndex(value: number) {
    if (this._selectedIndex != value) {
      this._selectedIndex = value;
      this._value = this.items[this.selectedIndex] || null;
    }
  }

  @Input()
  itemTextProperty = 'text';

  @Input()
  itemDisabledProperty = 'disabled';

  getTextFromItem(item: string | any): string {
    if (!item) return null;
    return typeof item === 'string' ? item : item[this.itemTextProperty];
  }

  getDisabledStateFromItem(item: string | any): boolean {
    if (!item) return null;
    return typeof item === 'string' ? null : item[this.itemDisabledProperty];
  }

  private _value: string | any = null;
  get value(): string | any {
    return this._value;
  }

  @Input() set value(value: any) {
    this.setSelectedItem(value);
  }

  /**
   * Emitted when an option is selected
   */
  @Output() change: EventEmitter<string | any> = new EventEmitter<string | any>();

  onChange(value) {
    this.setSelectedItem(value);
    this.change.emit(value);
  }

  private setSelectedItem(value: any) {
    if (this._value !== value) {
      this._value = value;
      this._selectedIndex = this.items.indexOf(value);
    }
  }
}
