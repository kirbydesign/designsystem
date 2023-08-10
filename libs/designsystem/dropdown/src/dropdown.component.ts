import {
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
  RendererStyleFlags2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

import { EventListenerDisposeFn } from '@kirbydesign/designsystem/types';
import { FloatingDirective } from '@kirbydesign/designsystem/shared/floating';
import { OpenState, VerticalDirection } from './dropdown.types';
import { KeyboardHandlerService } from './keyboard-handler.service';

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
export class DropdownComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  slottedItems: QueryList<ElementRef<HTMLElement>>;
  @ViewChild(CardComponent, { read: ElementRef })
  cardElement: ElementRef<HTMLElement>;
  @ViewChild(PopoverComponent)
  popover?: PopoverComponent;
  @ViewChild(ButtonComponent, { static: true, read: ElementRef })
  buttonElement: ElementRef<HTMLElement>;
  @ViewChildren(ItemComponent, { read: ElementRef })
  kirbyItemsDefault: QueryList<ElementRef<HTMLElement>>;
  @ContentChildren(ItemComponent, { read: ElementRef })
  _kirbyItemsSlotted: QueryList<ElementRef<HTMLElement>>;
  @ViewChild(FloatingDirective, { static: true }) floatingDirective: FloatingDirective;

  static readonly OPEN_DELAY_IN_MS = 100;
  private state = OpenState.closed;
  private horizontalDirection: HorizontalDirection | `${HorizontalDirection}` =
    HorizontalDirection.right;
  private verticalDirection: VerticalDirection | `${VerticalDirection}` = VerticalDirection.down;

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
      this.focusedIndex = this._selectedIndex;
      this._value = this.items[this.selectedIndex] || null;
    }
  }

  // _focusedIndex keeps track of which element has focus and will be selected
  // if it is activated (by pressing ENTER or SPACE key)
  private _focusedIndex: number = -1;
  get focusedIndex(): number {
    return this._focusedIndex;
  }

  @Input() set focusedIndex(value: number) {
    if (this._focusedIndex !== value) {
      this._focusedIndex = value;
      this.scrollItemIntoView(this._focusedIndex);
    }
  }

  @Input()
  itemTextProperty = 'text';

  @Input()
  placeholder = 'Please select:';

  @Input() set popout(direction: HorizontalDirection | `${HorizontalDirection}`) {
    this.horizontalDirection = direction || HorizontalDirection.right;
  }

  get popout() {
    return this.horizontalDirection;
  }

  @Input()
  attentionLevel: '1' | '2' | '3' = '3';

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
  tabindex = '';

  @HostBinding('class.with-popover')
  @Input()
  usePopover = false;

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
    return this.state === OpenState.opening;
  }

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return this.state === OpenState.open;
  }

  @HostBinding('class.popout-left')
  get _popoutLeft() {
    return this.horizontalDirection === HorizontalDirection.left;
  }

  @HostBinding('class.popout-up')
  get _popoutUp() {
    return this.verticalDirection === VerticalDirection.up;
  }

  set kirbyItemsSlotted(kirbyItems: QueryList<ElementRef<HTMLElement>>) {
    const hasSlottedItems = this.itemClickUnlisten?.length > 0;
    if (hasSlottedItems) {
      this.unlistenAllSlottedItems();
    }

    // Setup a click listener for each new slotted items
    kirbyItems.forEach((kirbyItem, index) => {
      this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
      const unlisten: EventListenerDisposeFn = this.renderer.listen(
        kirbyItem.nativeElement,
        'click',
        () => {
          this.onItemSelect(index);
        }
      );

      this.itemClickUnlisten.push(unlisten);
    });

    this._kirbyItemsSlotted = kirbyItems;
  }

  get kirbyItemsSlotted(): QueryList<ElementRef<HTMLElement>> {
    return this._kirbyItemsSlotted;
  }

  private itemClickUnlisten: EventListenerDisposeFn[] = [];
  private intersectionObserverRef: IntersectionObserver;
  private showDropdownTimeoutId: ReturnType<typeof setTimeout>;

  protected DOMPortalOutlet: HTMLElement = this.elementRef.nativeElement.ownerDocument.body;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    private keyboardHandlerService: KeyboardHandlerService
  ) {}

  onToggle(event: MouseEvent) {
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

  /* Utility that makes it easier to set styles on card element
  when using popover*/
  private setPopoverCardStyle(style: string, value: string) {
    this.renderer.setStyle(
      this.cardElement.nativeElement,
      style,
      value,
      RendererStyleFlags2.DashCase
    );
  }

  ngAfterViewInit() {
    const { width } = this.elementRef.nativeElement.getBoundingClientRect();
    this.setPopoverCardStyle('--kirby-card-width', `${width}px`);
    this.floatingDirective.placement =
      this.horizontalDirection === 'left' ? 'bottom-end' : 'bottom-start';
  }

  open() {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      this.state = OpenState.opening;

      this.showDropdownTimeoutId = setTimeout(
        () => this.showDropdown(),
        DropdownComponent.OPEN_DELAY_IN_MS
      );

      // Move focus to selected item (if any)
      this.focusedIndex = this.selectedIndex;
    }
  }

  private showDropdown() {
    if (this.state === OpenState.opening) {
      this.state = OpenState.open;
      this.scrollItemIntoView(13);
      this.changeDetectorRef.markForCheck();
    }
  }

  close() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.state = OpenState.closed;
      // Reset vertical direction to default
      this.verticalDirection = VerticalDirection.down;
      //this.floatingDirective.hide();
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
      this.focusedIndex = index;
      this.change.emit(this.value);
      this._onChange(this.value);
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
        itemElement.scrollIntoView({ block: 'nearest' });
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

  @HostListener('touchstart', ['$event'])
  _onTouchStart(event: TouchEvent) {
    if (this.isOpen) {
      event.stopPropagation();
    }
  }

  @HostListener('focus')
  _onFocus() {
    if (this.disabled) {
      this.elementRef.nativeElement.blur();
    }
  }

  @HostListener('blur', ['$event'])
  _onBlur(event?: FocusEvent) {
    this.close();
    this._onTouched();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  _onEnterOrSpace(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isOpen) {
      this.selectItem(this.focusedIndex);
    }

    this.toggle();
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  _onArrowKeys(event: KeyboardEvent) {
    if (this.disabled) return false;

    // Mirror default HTML5 select behaviour - prevent left/right arrows when open:
    if (this.isOpen && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      return false;
    }

    if (!this.isOpen) {
      // Avoid page scroll
      event.preventDefault();
      this.open();

      // If no selected item then focus first or last item
      if (this.selectedIndex < 0) {
        switch (event.key) {
          case 'ArrowUp':
            this.focusedIndex = this.items.length - 1;
            break;
          case 'ArrowDown':
            this.focusedIndex = 0;
            break;
          default:
            break;
        }
      }

      return false;
    }

    const newFocusedIndex = this.keyboardHandlerService.handle(
      event,
      this.focusedIndex,
      this.items.length - 1
    );

    if (newFocusedIndex > -1) {
      this.focusedIndex = newFocusedIndex;
    }

    return false;
  }

  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  _onHomeEndKeys(event: KeyboardEvent) {
    if (this.disabled) return;
    if (!this.isOpen) return;

    const newFocusedIndex = this.keyboardHandlerService.handle(
      event,
      this.focusedIndex,
      this.items.length - 1
    );
    if (newFocusedIndex > -1) {
      this.focusedIndex = newFocusedIndex;
    }
    return false;
  }

  private unlistenAllSlottedItems() {
    let unlistenItem: () => void;
    while ((unlistenItem = this.itemClickUnlisten.pop()) !== undefined) {
      unlistenItem();
    }
  }

  ngOnDestroy(): void {
    this.unlistenAllSlottedItems();
    if (this.intersectionObserverRef) {
      this.intersectionObserverRef.disconnect();
    }
  }
}
