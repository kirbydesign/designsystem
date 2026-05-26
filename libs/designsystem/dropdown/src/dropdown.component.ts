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
import { StringSearchHelper, UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import {
  EventListenerDisposeFn,
  FORM_FIELD_CONTROL,
  FormFieldControl,
} from '@kirbydesign/designsystem/types';
import { forwardAttributes, ResizeObserverService } from '@kirbydesign/designsystem/shared';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { NgTemplateOutlet } from '@angular/common';
import { OpenState } from './dropdown.types';
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
    { provide: FORM_FIELD_CONTROL, useExisting: forwardRef(() => DropdownComponent) },
  ],
  imports: [
    ButtonComponent,
    NgTemplateOutlet,
    PopoverComponent,
    CardComponent,
    ItemComponent,
    IconComponent,
  ],
})
export class DropdownComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor, FormFieldControl
{
  static readonly OPEN_DELAY_IN_MS = 100;
  private state = OpenState.closed;
  private _popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  _listboxId = UniqueIdGenerator.scopedTo('kirby-dropdown').next();
  _comboboxId = UniqueIdGenerator.scopedTo('kirby-button').next();

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
    if (value !== undefined && this._selectedIndex != value) {
      this._selectedIndex = value;
      this.focusedIndex = this._selectedIndex;
      this._value = this.items[this.selectedIndex] || null;
    }
  }

  // _focusedIndex keeps track of which element has focus and will be selected
  // if it is activated (by pressing ENTER or SPACE key)
  private _focusedIndex: number = 0;
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
    this._popout = direction || HorizontalDirection.right;
  }

  get popout() {
    return this._popout;
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

  @Output() hasErrorChange = new EventEmitter<boolean>();

  private _hasError: boolean;
  @HostBinding('class.error')
  @Input()
  get hasError(): boolean {
    return this._hasError;
  }

  set hasError(value: boolean) {
    if (this._hasError !== value) {
      this._hasError = value;
      this.hasErrorChange.emit(this._hasError);
    }
  }

  @Input()
  size: 'sm' | 'md' = 'md';

  // Tabindex defaults to 0 instead of no value to align tabbing behavior in Safari
  // with other browsers and the default select behavior: https://mayank.co/blog/safari-focus/
  @Input()
  tabindex = 0;

  /**
   * @deprecated This input is no longer needed. The dropdown now always uses popover positioning.
   * This input will be removed in a future major version.
   */
  @Input() set usePopover(_value: boolean) {
    console.warn(
      `[Kirby Dropdown] The 'usePopover' input is deprecated and no longer has any effect.
        The dropdown now always uses popover positioning. This input will be removed in a future major version.`
    );
  }

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

  @HostBinding('class.is-opening')
  get _isOpening(): boolean {
    return this.state === OpenState.opening;
  }

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return this.state === OpenState.open;
  }

  /* The 'clicked' class is applied through Hostbinding to prevent the dropdown from getting a focus ring on click.
    There is a bug that causes the dropdown to get a focus ring on click, if it is the first element that is interacted with
    after the page is loaded. If the user interacts with any other element before, then the dropdown won't get a focus ring.
    See issue: https://github.com/kirbydesign/designsystem/issues/2477.

    This solution can potentially be refactored, when popover is not experimental anymore. Then it could be possible
    to close the dropdown when the popover backdrop is clicked, instead of relying on the blur event, which is utilized
    by this line below: this.elementRef.nativeElement.focus(). Right now this forces the blur event to be triggered, when
    clicking outside of the dropdown.
    */
  @HostBinding('class.clicked')
  clicked = false;

  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  slottedItems: QueryList<ElementRef<HTMLElement>>;
  @ViewChild(CardComponent, { read: ElementRef })
  cardElement: ElementRef<HTMLElement>;
  @ViewChild(PopoverComponent)
  popover: PopoverComponent;
  @ViewChild(ButtonComponent, { static: true, read: ElementRef })
  buttonElement: ElementRef<HTMLElement>;

  get interactiveElement(): HTMLElement {
    return this.buttonElement.nativeElement;
  }

  private forwardAriaLabelToDropdownButton() {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.buttonElement.nativeElement
    );
  }
  @ViewChildren(ItemComponent, { read: ElementRef })
  kirbyItemsDefault: QueryList<ElementRef<HTMLElement>>;

  _kirbyItemsSlotted: QueryList<ElementRef<HTMLElement>>;
  @ContentChildren(ItemComponent, { read: ElementRef })
  set kirbyItemsSlotted(kirbyItems: QueryList<ElementRef<HTMLElement>>) {
    const hasSlottedItems = this.disposeItemClickListeners?.length > 0;
    if (hasSlottedItems) {
      this.unlistenAllSlottedItems();
    }

    // Setup a click listener for each new slotted items
    kirbyItems.forEach((kirbyItem) => {
      this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
      const disposeClickListener: EventListenerDisposeFn = this.renderer.listen(
        kirbyItem.nativeElement,
        'click',
        () => {
          this.onItemSelect(this.domIndexOf(kirbyItem));
        }
      );

      this.disposeItemClickListeners.push(disposeClickListener);
    });

    this._kirbyItemsSlotted = kirbyItems;
  }

  get kirbyItemsSlotted(): QueryList<ElementRef<HTMLElement>> {
    return this._kirbyItemsSlotted;
  }

  private disposeItemClickListeners: EventListenerDisposeFn[] = [];
  private searchBuffer: string = '';
  private searchBufferTimeout: ReturnType<typeof setTimeout>;
  private SEARCH_BUFFER_DELAY = 500; // ms

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private keyboardHandlerService: KeyboardHandlerService,
    private resizeObserverService: ResizeObserverService
  ) {}

  onToggle(event: MouseEvent) {
    event.stopPropagation();

    this.clicked = true;

    this.toggle();
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    this.isOpen ? this.close() : this.open();
  }

  /* Utility that makes it easier to set styles on card element */
  private setPopoverCardStyle(style: string, value: string) {
    this.renderer.setStyle(
      this.cardElement.nativeElement,
      style,
      value,
      RendererStyleFlags2.DashCase
    );
  }

  ngAfterViewInit() {
    if (this.expand === 'block') {
      const { width: initialWidth } = this.elementRef.nativeElement.getBoundingClientRect();
      this.setPopoverCardStyle('max-width', 'initial');
      this.setPopoverCardStyle('min-width', 'initial');
      // Ensure initial width is set even if the resize observer callback also fires initially:
      this.setPopoverCardStyle('--kirby-card-width', `${initialWidth}px`);

      this.resizeObserverService.observe(this.elementRef, (entry) => {
        const newWidth = entry.contentRect.width;
        if (newWidth > 0) {
          this.setPopoverCardStyle('--kirby-card-width', `${newWidth}px`);
        }
      });
    }
    this.forwardAriaLabelToDropdownButton();
  }

  open() {
    if (this.disabled) {
      return;
    }

    if (!this.isOpen) {
      this.state = OpenState.opening;
      // ensures that the dropdown is opened in case the IntersectionObserverCallback isn't invoked
      setTimeout(() => this.showDropdown(), DropdownComponent.OPEN_DELAY_IN_MS);

      // Move focus to selected item (if any) or first item
      this.focusedIndex = this.selectedIndex > -1 ? this.selectedIndex : 0;
    }
  }

  private showDropdown() {
    if (this.state === OpenState.opening) {
      this.state = OpenState.open;
      this.popover?.show();
      this.scrollItemIntoView(this.focusedIndex);
      this.cdr.markForCheck();
    }
  }

  close() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.state = OpenState.closed;
      this.popover?.hide();
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
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
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

  @HostListener('keydown.tab')
  @HostListener('keydown.shift.tab')
  _onTab() {
    if (this.isOpen) {
      this.selectItem(this.focusedIndex);
      this.close();
    }

    if (this.clicked) {
      // Remove the 'clicked' class (Hostbinding) if the user has previously opened the dropdown by clicking,
      // since the class prevents the focus ring from showing,
      // which is expected to happen, when using the tab key
      this.clicked = false;
    }
  }

  private preventDefaultAndStopImmediatePropagation(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private addToSearchBuffer(char: string) {
    clearTimeout(this.searchBufferTimeout);
    this.searchBuffer += char;
    this.searchBufferTimeout = setTimeout(() => {
      this.resetSearchBuffer();
    }, this.SEARCH_BUFFER_DELAY);
  }
  private resetSearchBuffer() {
    this.searchBuffer = '';
  }

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent) {
    const key = event.key;

    if (this.items.length === 0) {
      console.warn('[Kirby] No items found within dropdown');
      return;
    }

    if (this.disabled) return;

    if (StringSearchHelper.isPrintableCharacter(key)) {
      this.handlePrintableCharacterKey(event, this.isOpen);
    }

    // ALT + ArrowDown: Open dropdown
    if (key === 'ArrowDown' && event.altKey) {
      this.preventDefaultAndStopImmediatePropagation(event);
      if (!this.isOpen) {
        this.open();
        this.focusedIndex = this.selectedIndex > -1 ? this.selectedIndex : 0;
      }
      return;
    }

    // ALT + ArrowUp: Select focused item and close dropdown
    if (key === 'ArrowUp' && event.altKey) {
      this.preventDefaultAndStopImmediatePropagation(event);
      if (this.focusedIndex > -1) {
        this.selectItem(this.focusedIndex);
        this.close();
      }
    }
    // PageUp: Jump up 10 options or to first
    if (key === 'PageUp') {
      this.preventDefaultAndStopImmediatePropagation(event);
      if (!this.isOpen) {
        this.open();
      }
      this.focusedIndex = Math.max(0, this.focusedIndex - 10);
      return;
    }

    // PageDown: Jump down 10 options or to last
    if (key === 'PageDown') {
      this.preventDefaultAndStopImmediatePropagation(event);
      if (!this.isOpen) {
        this.open();
      }
      this.focusedIndex = Math.min(this.items.length - 1, this.focusedIndex + 10);
      return;
    }
  }

  private handlePrintableCharacterKey(event: KeyboardEvent, isOpen: boolean) {
    const key = event.key;

    if (isOpen) {
      this.preventDefaultAndStopImmediatePropagation(event);
    } else {
      this.open();
    }

    // If the same character is typed twice, the search buffer should only contain that character once
    if (
      this.searchBuffer.length === 1 &&
      this.searchBuffer[0].toLowerCase() === key.toLowerCase()
    ) {
      this.searchBuffer = key;
    } else {
      this.addToSearchBuffer(key);
    }

    const isMultiCharSearch = this.searchBuffer.length > 1;
    let startIndex = 0;

    if (!isMultiCharSearch && this.isOpen) {
      startIndex = this.focusedIndex + 1;
    }

    let foundItemIndex = this.getIndexOfItemByFirstCharacter(this.searchBuffer, startIndex);

    if (foundItemIndex === -1 && isMultiCharSearch) {
      foundItemIndex = this.getIndexOfItemByFirstCharacter(key, startIndex);
    }

    if (foundItemIndex === -1 && !isMultiCharSearch && this.isOpen) {
      foundItemIndex = this.getIndexOfItemByFirstCharacter(this.searchBuffer, 0);
    }

    if (foundItemIndex > -1) {
      this.focusedIndex = foundItemIndex;
    }
  }

  private getIndexOfItemByFirstCharacter(char: string, startIndex: number = 0) {
    let itemTexts: string[];
    // Prefer slotted/projected items if present
    if (this.kirbyItemsSlotted && this.kirbyItemsSlotted.length) {
      itemTexts = this.kirbyItemsSlotted
        .toArray()
        .map((ref) => ref.nativeElement.textContent?.trim() ?? '');
    } else {
      itemTexts = this.items.map((item) => this.getTextFromItem(item) ?? '');
    }

    return StringSearchHelper.getIndexByFirstMatchingStartString(char, itemTexts, startIndex);
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

  _onPopoverWillHide() {
    this.state = OpenState.closed;
    this.buttonElement.nativeElement.focus();
    this._onTouched();
  }

  @HostListener('focusout')
  _onFocusOut() {
    if (!this.isOpen) {
      this._onTouched();
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.escape')
  _onEnterOrEscape() {
    this.close();
  }

  _onPopoverClick() {
    this.close();
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
      if (!event.altKey && this.selectedIndex < 0) {
        switch (event.key) {
          case 'ArrowUp':
            this.focusedIndex = 0;
            break;
          case 'ArrowDown':
            this.focusedIndex = this.items.length - 1;
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
    if (!this.isOpen) {
      event.preventDefault();
      this.open();
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

  private domIndexOf(kirbyItem: ElementRef<HTMLElement>): number {
    return this._kirbyItemsSlotted
      .toArray()
      .sort((a, b) =>
        a.nativeElement.compareDocumentPosition(b.nativeElement) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1
      )
      .findIndex((item) => item.nativeElement === kirbyItem.nativeElement);
  }

  private unlistenAllSlottedItems() {
    let disposeClickListener: EventListenerDisposeFn;
    while ((disposeClickListener = this.disposeItemClickListeners.pop()) !== undefined) {
      disposeClickListener();
    }
  }

  ngOnDestroy(): void {
    this.unlistenAllSlottedItems();
    this.resizeObserverService.unobserve(this.elementRef);
  }
}
