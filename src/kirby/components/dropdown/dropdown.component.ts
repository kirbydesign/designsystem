import {
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ContentChild,
  HostListener,
  ElementRef,
  ContentChildren,
  ViewChildren,
  QueryList,
  ViewChild,
  AfterContentChecked,
  Renderer2,
  Output,
  EventEmitter,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ListItemTemplateDirective } from '../list/list.directive';
import { ItemComponent } from '../item/item.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'kirby-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements AfterContentChecked, OnDestroy, ControlValueAccessor {
  @Input()
  items: string[] | any[] = [];

  private _selectedIndex: number = -1;
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @Input() set selectedIndex(value: number) {
    if (this._selectedIndex != value) {
      this._selectedIndex = value;
      this._value = this.items[this.selectedIndex];
    }
  }

  @Input()
  itemTextProperty = 'text';

  @Input()
  placeholder = 'Please select:';

  @Input()
  attentionLevel: '1' | '2' | '3' | '4' = '3';
  readonly attentionLevelOpen = '2';

  @Input()
  expand?: 'block';

  @Input()
  disabled = false;

  @HostBinding('attr.disabled')
  private get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.error')
  @Input()
  hasError: boolean;

  @Input()
  tabindex = 0;

  @HostBinding('attr.tabindex')
  private get _tabindex() {
    return this.disabled ? -1 : this.tabindex;
  }

  /**
   * Emitted when an item is selected (tap on mobile, click/keypress on web)
   */
  @Output() change: EventEmitter<string | any> = new EventEmitter<string | any>();

  private _value: string | any = null;
  get value(): string | any {
    return this._value;
  }

  get selectedText(): string {
    return this.getTextFromItem(this.value);
  }

  @HostBinding('class.expand')
  private get _isBlockLevel() {
    return this.expand === 'block';
  }

  @HostBinding('attr.role') private _role = 'listbox';
  @HostBinding('class.is-opening')
  private _isOpening: boolean;

  @HostBinding('class.is-open')
  isOpen = false;

  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  slottedItems: QueryList<ElementRef<HTMLElement>>;
  @ViewChild(CardComponent, { static: true, read: ElementRef })
  cardElement: ElementRef<HTMLElement>;
  @ViewChildren(ItemComponent, { read: ElementRef })
  kirbyItemsDefault: QueryList<ElementRef<HTMLElement>>;
  @ContentChildren(ItemComponent, { read: ElementRef })
  kirbyItemsSlotted: QueryList<ElementRef<HTMLElement>>;

  private itemClickUnlisten: () => void;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  onToggle(event: Event) {
    event.stopPropagation();
    if (!this.isOpen) {
      this.elementRef.nativeElement.focus();
    }
    this.toggle();
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    this.isOpen ? this.close() : this.open();
  }

  onButtonMouseEvent(event: Event) {
    // Prevent button focus;
    event.preventDefault();
  }

  ngAfterContentChecked() {
    if (this.kirbyItemsSlotted.length) {
      this.kirbyItemsSlotted.forEach((kirbyItem, index) => {
        this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
        this.itemClickUnlisten = this.renderer.listen(kirbyItem.nativeElement, 'click', () => {
          this.onItemSelect(index);
        });
      });
    }
  }

  open() {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      this._isOpening = true;
      setTimeout(() => {
        this.isOpen = true;
        this.scrollItemIntoView(this.selectedIndex);
      });
    }
  }

  close() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this._isOpening = false;
      this.isOpen = false;
    }
  }

  onItemSelect(index: number) {
    this.selectItem(index);
    this.close();
  }

  private _onChange: (value: any) => void = () => {};
  private _onTouched = () => {};

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: any): void {
    this._selectItemByValue(value);
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private selectItem(index: number) {
    if (index != this.selectedIndex) {
      this.selectedIndex = index;
      this.change.emit(this.value);
      this._onChange(this.value);
      this.scrollItemIntoView(index);
    }
  }

  private _selectItemByValue(value: string | any) {
    this.selectedIndex = this.items.indexOf(value);
  }

  getTextFromItem(item: string | any) {
    if (!item) {
      return null;
    }
    return typeof item === 'string' ? item : item[this.itemTextProperty];
  }

  scrollItemIntoView(index: number) {
    const kirbyItems =
      this.kirbyItemsSlotted && this.kirbyItemsSlotted.length
        ? this.kirbyItemsSlotted
        : this.kirbyItemsDefault;
    if (kirbyItems && kirbyItems.length) {
      const selectedKirbyItem = kirbyItems.toArray()[index];
      if (selectedKirbyItem && selectedKirbyItem.nativeElement) {
        const itemElement = selectedKirbyItem.nativeElement;
        const scrollContainer = this.cardElement.nativeElement;
        const itemTop = itemElement.offsetTop;
        const itemBottom = itemElement.offsetTop + itemElement.offsetHeight;
        const containerVisibleTop = scrollContainer.scrollTop;
        const containerVisibleBottom = scrollContainer.clientHeight + scrollContainer.scrollTop;
        if (itemTop < containerVisibleTop) {
          scrollContainer.scrollTop = itemTop;
        } else if (itemBottom > containerVisibleBottom) {
          scrollContainer.scrollTop = itemBottom - scrollContainer.clientHeight;
        }
      }
    }
  }

  @HostListener('keydown.tab', ['$event'])
  private _onTab(event: KeyboardEvent) {
    if (this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  @HostListener('mousedown', ['$event'])
  private _onMouseDown(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('focus', ['$event'])
  private _onFocus(event: Event) {
    if (this.disabled) {
      this.elementRef.nativeElement.blur();
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.escape')
  @HostListener('blur')
  private _onBlur() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.close();
    }
    this._onTouched();
  }

  @HostListener('keydown.space', ['$event'])
  private _onSpace(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isOpen) {
      this.open();
    }
  }

  @HostListener('keydown.enter', ['$event'])
  private _onEnter(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  private _onArrowKeys(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }
    if (this.isOpen && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      // Mirror default HTML5 select behaviour - prevent left/right arrows when open:
      return;
    }
    event.preventDefault();
    let newIndex = -1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      // Select previous item:
      newIndex = this.selectedIndex - 1;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (this.selectedIndex === undefined) {
        // None selected, select first item:
        newIndex = 0;
      } else if (this.selectedIndex < this.items.length - 1) {
        // Select next item:
        newIndex = this.selectedIndex + 1;
      }
    }
    if (newIndex > -1) {
      this.selectItem(newIndex);
    }
  }

  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  private _onHomeEndKeys(event: KeyboardEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    let newIndex = -1;
    if (event.key === 'Home') {
      // Select first item:
      newIndex = 0;
    }
    if (event.key === 'End') {
      // Select last item:
      newIndex = this.items.length - 1;
    }
    if (newIndex > -1) {
      this.selectItem(newIndex);
    }
  }

  ngOnDestroy(): void {
    if (this.itemClickUnlisten) {
      this.itemClickUnlisten();
    }
  }
}
