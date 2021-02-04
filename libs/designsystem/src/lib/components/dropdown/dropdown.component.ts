import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CardComponent } from '../card/card.component';
import { ItemComponent } from '../item/item.component';
import { ListItemTemplateDirective } from '../list/list.directive';

export enum openState {
  closed,
  opening,
  open,
}

export enum cardAlignment {
  right = 'right',
  left = 'left',
}
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
export class DropdownComponent
  implements AfterContentChecked, AfterViewInit, OnDestroy, ControlValueAccessor {
  static readonly OPEN_DELAY_IN_MS = 100;
  private state = openState.closed;
  private hasConfiguredSlottedItems = false;

  private _items: string[] | any[] = [];
  get items(): string[] | any[] {
    return this._items;
  }

  @Input() set items(value: string[] | any[]) {
    this._items = value;
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
  placeholder = 'Please select:';

  @Input()
  cardAlign: cardAlignment = cardAlignment.left;

  @Input()
  attentionLevel: '1' | '2' | '3' | '4' = '3';
  readonly attentionLevelOpen = '2';

  @Input()
  expand?: 'block';

  @Input()
  disabled = false;

  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.error')
  @Input()
  hasError: boolean;

  @Input()
  size: 'sm' | 'md' = 'md';

  @Input()
  tabindex = 0;

  @HostBinding('attr.tabindex')
  get _tabindex() {
    return this.disabled ? -1 : this.tabindex;
  }

  // Prevent Ionic blur on scroll
  @HostBinding('attr.no-blur')
  get _noBlurOnScroll() {
    return true;
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
  get _isBlockLevel() {
    return this.expand === 'block';
  }

  @HostBinding('attr.role')
  _role = 'listbox';

  @HostBinding('class.is-opening')
  get _isOpening(): boolean {
    return this.state === openState.opening;
  }

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return this.state === openState.open;
  }

  @HostBinding('class.align-end')
  _alignEnd: boolean;

  @HostBinding('class.align-top')
  _alignTop: boolean;

  private set _horizontal(value: 'start' | 'end') {
    this._alignEnd = value === 'end';
  }
  private set _vertical(value: 'up' | 'down') {
    this._alignTop = value === 'up';
  }

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

  private itemClickUnlisten: (() => void)[] = [];
  private intersectionObserverRef: IntersectionObserver;
  private showDropdownTimeoutId;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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
    if (!this.hasConfiguredSlottedItems && this.kirbyItemsSlotted.length) {
      this.kirbyItemsSlotted.forEach((kirbyItem, index) => {
        this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
        const unlisten = this.renderer.listen(kirbyItem.nativeElement, 'click', () => {
          this.onItemSelect(index);
        });
        this.itemClickUnlisten.push(unlisten);
      });
      this.hasConfiguredSlottedItems = true;
    }
  }

  ngAfterViewInit() {
    this.initializeAlignment();
  }

  private initializeAlignment() {
    if (!this.intersectionObserverRef) {
      const options = {
        rootMargin: '0px',
      };
      const callback: IntersectionObserverCallback = (entries) => {
        // Only apply alignment when opening:
        if (this.state !== openState.opening) {
          return;
        }

        if (this.cardAlign === cardAlignment.right) {
        }
        // Cancel any pending timer to show dropdown:
        clearTimeout(this.showDropdownTimeoutId);
        const entry = entries[0];
        const isVisible = entry.boundingClientRect.width > 0;
        if (isVisible && entry.intersectionRatio < 1) {
          this.setCardAlignment(entry);

          if (entry.boundingClientRect.top < 0) {
            // entry is cut off at the top by ${entry.boundingClientRect.top}px
            // open downwards:
            this._vertical = 'down';
          }
          if (entry.boundingClientRect.bottom > entry.rootBounds.bottom) {
            // entry is cut off at the bottom by ${entry.boundingClientRect.bottom - entry.intersectionRect.bottom}px
            const containerOffsetTop = this.elementRef.nativeElement.getBoundingClientRect().top;
            const SPACING = 5; //TODO: Get from SCSS
            // Check if the card can fit on top of button:
            if (containerOffsetTop > entry.target.clientHeight + SPACING) {
              // open upwards:
              this._vertical = 'up';
            }
          }
        }
        this.showDropdown();
        this.changeDetectorRef.detectChanges();
      };
      this.intersectionObserverRef = new IntersectionObserver(callback, options);
      this.intersectionObserverRef.observe(this.cardElement.nativeElement);
    }
  }

  private setCardAlignment(entry) {
    // If card alignment is left, and the entry is cut off to the right by ${entry.boundingClientRect.right - entry.intersectionRect.right}px
    // it is set to align to end in stead, and vice versa for right-aligned card
    if (this.cardAlign === cardAlignment.left) {
      if (entry.boundingClientRect.right > entry.rootBounds.right) {
        this._horizontal = 'end';
        this.cardAlign = cardAlignment.right;
      }
    } else {
      if (entry.boundingClientRect.left < entry.rootBounds.left) {
        this._horizontal = 'start';
        this.cardAlign = cardAlignment.left;
      }
    }
  }

  open() {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      this.state = openState.opening;
      // ensures that the dropdown is opened in case the IntersectionObserverCallback isn't invoked
      this.showDropdownTimeoutId = setTimeout(
        () => this.showDropdown(),
        DropdownComponent.OPEN_DELAY_IN_MS
      );
    }
  }

  private showDropdown() {
    if (this.state === openState.opening) {
      this.state = openState.open;
      this.scrollItemIntoView(this.selectedIndex);
      this.changeDetectorRef.markForCheck();
    }
  }

  close() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.state = openState.closed;
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
  _onTab(event: KeyboardEvent) {
    if (this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }

  @HostListener('mousedown', ['$event'])
  _onMouseDown(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('focus', ['$event'])
  _onFocus(event: Event) {
    if (this.disabled) {
      this.elementRef.nativeElement.blur();
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.escape')
  @HostListener('blur')
  _onBlur() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.close();
    }
    this._onTouched();
  }

  @HostListener('keydown.space', ['$event'])
  _onSpace(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isOpen) {
      this.open();
    }
  }

  @HostListener('keydown.enter', ['$event'])
  _onEnter(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.toggle();
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  _onArrowKeys(event: KeyboardEvent) {
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
  _onHomeEndKeys(event: KeyboardEvent) {
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
    let unlisten: () => void;
    while ((unlisten = this.itemClickUnlisten.pop()) !== undefined) {
      unlisten();
    }
    if (this.intersectionObserverRef) {
      this.intersectionObserverRef.disconnect();
    }
  }
}
