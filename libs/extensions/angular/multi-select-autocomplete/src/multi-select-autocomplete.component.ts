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
  OnInit,
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
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import {
  AffixDirective,
  FormFieldComponent,
  InputSize,
} from '@kirbydesign/designsystem/form-field';
import { EventListenerDisposeFn } from '@kirbydesign/designsystem/types';
import { forwardAttributes, ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { InputComponent } from '@kirbydesign/designsystem/form-field';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { NgTemplateOutlet } from '@angular/common';
import { OpenState } from './multi-select-autocomplete.types';

@Component({
  selector: 'kirby-multi-select-autocomplete',
  templateUrl: './multi-select-autocomplete.component.html',
  styleUrls: ['./multi-select-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectAutocompleteComponent),
      multi: true,
    },
  ],
  imports: [
    InputComponent,
    NgTemplateOutlet,
    PopoverComponent,
    CardComponent,
    ItemComponent,
    IconComponent,
    AffixDirective,
    FormFieldComponent,
  ],
})
export class MultiSelectAutocompleteComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  static readonly OPEN_DELAY_IN_MS = 100;
  private state = OpenState.closed;
  private _popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  protected dropdownId: string = UniqueIdGenerator.scopedTo('kirby-dropdown').next();
  protected inputId: string = UniqueIdGenerator.scopedTo('kirby-input').next();

  private readonly _defaultSearchFunction = (searchTerm: string): unknown[] => {
    if (!searchTerm) {
      return this.items;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return this.items.filter((item) =>
      this.getItemText(item).toLowerCase().includes(lowerSearchTerm)
    );
  };

  @Input()
  public noSearchResultsText = 'Ingen resultater';

  @Input()
  public itemTextProperty: string = 'text';
  protected getItemText(item: unknown): string {
    if (typeof item === 'string') {
      return item;
    }
    if (item && typeof item === 'object' && this.itemTextProperty in item) {
      return (item as Record<string, unknown>)[this.itemTextProperty] as string;
    }
    return '';
  }

  @Input()
  public itemIdProperty = 'id';
  protected getItemId(item: unknown): string {
    if (!item) {
      return '';
    }

    if (typeof item === 'string') {
      return item;
    }

    // object is complex, but the user uses standard template, so we generate an id based on the text
    if (item && typeof item === 'object' && !this.itemTemplate) {
      return this.dropdownId + '-item-' + this.getItemText(item);
    }

    // object is complex, and the user uses custom template, so we rely on itemIdProperty
    if (item && typeof item === 'object' && this.itemIdProperty in item) {
      return String((item as Record<string, unknown>)[this.itemIdProperty]);
    }

    // object is complex, and the user uses custom template, but itemIdProperty is missing
    throw new Error(
      'Each item must have an id property for scroll to work. Ensure that the itemIdProperty input is set correctly, and that each item has a unique id value.'
    );
  }

  @Input()
  public searchFunction: (searchTerm: string) => unknown[] = this._defaultSearchFunction;

  private _searchItems: unknown[] = [];
  protected get searchItems(): unknown[] {
    return this._searchItems;
  }
  private set searchItems(value: unknown[]) {
    this._searchItems = value;
    if (!this._searchItems) {
      return;
    }

    this.focusedItem = this._searchItems[0];
  }

  private _items: unknown[] = [];

  get items(): unknown[] {
    return this._items;
  }

  @Input()
  public set items(value: unknown[]) {
    this._items = value;
    this.searchItems = this._items;
  }

  private _selectedItem: unknown = undefined;
  get selectedItem(): unknown {
    return this._selectedItem;
  }

  @Input()
  public set selectedItem(value: unknown) {
    // Allow clearing by setting undefined
    if (value !== this._selectedItem) {
      this._selectedItem = value;
      this.focusedItem = this._selectedItem;
      // Keep ControlValueAccessor value in sync with the selected data item
      this.value = this._selectedItem;
    }
  }

  // _focusedItem keeps track of which element has focus and will be selected
  // if it is activated (by pressing ENTER)
  private _focusedItem: unknown = undefined;
  get focusedItem(): unknown {
    return this._focusedItem;
  }

  @Input()
  public set focusedItem(item: unknown) {
    if (this._focusedItem !== item) {
      this._focusedItem = item;
      this.scrollFocusedItemIntoView();
    }
  }

  @Input()
  public placeholder = 'Please search...';

  @Input()
  public set popout(direction: HorizontalDirection | `${HorizontalDirection}`) {
    this._popout = direction || HorizontalDirection.right;
  }

  public get popout() {
    return this._popout;
  }

  @Input()
  public expand?: 'block';

  @Input()
  public disabled = false;

  @HostBinding('attr.disabled')
  public get _isDisabled(): 'disabled' | null {
    return this.disabled ? 'disabled' : null;
  }

  @Output()
  hasErrorChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _hasError: boolean = false;

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
  public size: InputSize = InputSize.medium;

  // Tabindex defaults to 0 instead of no value to align tabbing behavior in Safari
  // with other browsers and the default select behavior: https://mayank.co/blog/safari-focus/
  @Input()
  public tabindex = 0;

  protected get _tabindex(): number {
    return this.disabled ? -1 : this.tabindex;
  }

  // Prevent Ionic blur on scroll
  @HostBinding('attr.no-blur')
  public get _noBlurOnScroll(): boolean {
    return true;
  }

  /**
   * Emitted when an item is selected (tap on mobile, click/keypress on web)
   */
  @Output()
  public change: EventEmitter<unknown> = new EventEmitter<unknown>();

  protected value: unknown = undefined;

  @HostBinding('class.expand')
  public get _isBlockLevel() {
    return this.expand === 'block';
  }

  @HostBinding('class.is-opening')
  public get _isOpening(): boolean {
    return this.state === OpenState.opening;
  }

  @HostBinding('class.is-open')
  public get isOpen(): boolean {
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
  public clicked: boolean = false;

  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  public itemTemplate?: TemplateRef<unknown>;

  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  public slottedItems?: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(CardComponent, { read: ElementRef })
  public cardElement?: ElementRef<HTMLElement>;

  @ViewChild(PopoverComponent)
  public popover?: PopoverComponent;

  @ViewChild(FormFieldComponent, { static: true, read: ElementRef })
  public formFieldElement!: ElementRef<HTMLElement>;

  @ViewChild(InputComponent, { read: ElementRef })
  private textInput?: ElementRef<HTMLInputElement>;

  private forwardAriaLabelToDropdownButton() {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.formFieldElement.nativeElement
    );
  }

  @ViewChildren(ItemComponent, { read: ElementRef })
  public kirbyItemsDefault?: QueryList<ElementRef<HTMLElement>>;

  _kirbyItemsSlotted?: QueryList<ElementRef<HTMLElement>>;
  @ContentChildren(ItemComponent, { read: ElementRef })
  public set kirbyItemsSlotted(kirbyItems: QueryList<ElementRef<HTMLElement>>) {
    const hasSlottedItems = this.disposeItemClickListeners?.length > 0;
    if (hasSlottedItems) {
      this.unlistenAllSlottedItems();
    }

    kirbyItems.forEach((kirbyItem, index) => {
      this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
      const disposeClickListener: EventListenerDisposeFn = this.renderer.listen(
        kirbyItem.nativeElement,
        'click',
        () => {
          this.onItemSelectIndex(index);
        }
      );

      this.disposeItemClickListeners.push(disposeClickListener);
    });

    this._kirbyItemsSlotted = kirbyItems;
  }

  public get kirbyItemsSlotted(): QueryList<ElementRef<HTMLElement>> | undefined {
    return this._kirbyItemsSlotted;
  }

  private disposeItemClickListeners: EventListenerDisposeFn[] = [];

  public constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private resizeObserverService: ResizeObserverService
  ) {}

  protected onToggle(event: MouseEvent) {
    event.stopPropagation();
    this.textInput?.nativeElement.focus();
    this.clicked = true;

    this.toggle();
  }

  private toggle(): void {
    if (this.disabled) {
      return;
    }
    this.isOpen ? this.close() : this.open();
  }

  public ngOnInit() {
    this.ensureComponents();
  }

  public ngAfterViewInit() {
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

  /* Utility that makes it easier to set styles on card element */
  private setPopoverCardStyle(style: string, value: string) {
    this.renderer.setStyle(
      this.cardElement?.nativeElement,
      style,
      value,
      RendererStyleFlags2.DashCase
    );
  }

  public ngOnDestroy(): void {
    this.unlistenAllSlottedItems();
  }

  private ensureComponents(): void {
    if (!this.formFieldElement) {
      throw new Error('requires <kirby-form-field> element to function properly');
    }

    // if (!this.itemIdProperty) {
    //   throw new Error('itemIdProperty input is required.');
    // }
  }

  private open(): void {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      this.state = OpenState.opening;
      setTimeout(() => this.showDropdown(), MultiSelectAutocompleteComponent.OPEN_DELAY_IN_MS);

      // Move focus to selected item (if any) or first item
      this.focusedItem = this.selectedItem;
    }
  }

  private showDropdown() {
    if (this.state === OpenState.opening) {
      this.state = OpenState.open;
      this.popover?.show();
      this.scrollFocusedItemIntoView();
      this.cdr.markForCheck();
    }
  }

  private close() {
    if (this.disabled) {
      return;
    }
    if (this.isOpen) {
      this.state = OpenState.closed;
      this.setInputDisplayValue(this.getItemText(this.selectedItem));
      this.searchItems = this.items;
      this.popover?.hide();
    }
  }

  private onItemSelectIndex(index: number): void {
    const item = this.searchItems[index];
    this.onItemSelect(item);
  }

  protected onItemSelect(item: unknown) {
    // Guard: slotted click listeners should map back to a data item, but be safe.
    if (item instanceof HTMLElement) return;
    this.selectItem(item);
    this.close();
  }

  private onChange: (value: unknown) => void = () => {
    /* empty */
  };
  private onTouched: () => void = (): void => {
    /* empty */
  };

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  public writeValue(value: string): void {
    this.selectItemByInput(value);

    // When written from outside, reflect selected text in the input
    this.setInputDisplayValue(this.getItemText(this.value));

    this.cdr.markForCheck();
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  private selectItem(item: unknown): void {
    if (item != this.selectedItem) {
      this.selectedItem = item;
      this.focusedItem = item;
      this.change.emit(this.value);
      this.onChange(this.value);
      this.setInputDisplayValue(this.getItemText(item));
      this.searchItems = this.items;
    }
  }

  private selectItemByInput(input: string): void {
    this.selectedItem = this.findItemByInput(input);
  }

  protected onInput(event: Event): void {
    if (!this.isOpen) {
      this.open();
    }

    const input = event.target as HTMLInputElement;
    this.searchItems = input.value ? this.searchFunction(input.value) : this.items;
  }

  protected onPopoverWillHide() {
    this.state = OpenState.closed;
    this.formFieldElement.nativeElement.focus();
    this.onTouched();
  }

  protected onPopoverClick() {
    this.close();
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) {
    if (this.isOpen) {
      event.stopPropagation();
    }
  }

  @HostListener('focusout', ['$event'])
  public onFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement | null; // relatedTarget is the element receiving focus
    const isOnTriggerButton =
      relatedTarget && this.elementRef.nativeElement.contains(relatedTarget);
    const isInsidePopover = relatedTarget && relatedTarget.closest('kirby-popover');

    if (!isOnTriggerButton && !isInsidePopover) {
      if (this.isOpen) {
        this.close();
      }
      this.onTouched();
    }
  }

  @HostListener('keydown.tab')
  public onTab() {
    if (this.isOpen) {
      this.selectItem(this.focusedItem);
      this.close();
    }

    if (this.clicked) {
      // Remove the 'clicked' class (Hostbinding) if the user has previously opened the dropdown by clicking,
      // since the class prevents the focus ring from showing,
      // which is expected to happen, when using the tab key
      this.clicked = false;
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.escape')
  public onEnterOrEscape() {
    this.close();
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnterOrSpace(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isOpen) {
      this.selectItem(this.focusedItem);
    }
    this.toggle();
  }

  @HostListener('keydown.arrowUp', ['$event'])
  @HostListener('keydown.arrowDown', ['$event'])
  @HostListener('keydown.pageUp', ['$event'])
  @HostListener('keydown.pageDown', ['$event'])
  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  public onArrowKeys(event: Event): void {
    if (this.disabled) return;

    const keyEvent = event as KeyboardEvent; // safe in this context
    // Avoid page scroll
    event.preventDefault();

    if (!this.isOpen) {
      this.open();
      this.setFocusOnFirstOrLastItem(keyEvent);
    } else {
      this.handleFocusNavigation(keyEvent);
    }
  }

  private handleFocusNavigation(keyEvent: KeyboardEvent): void {
    switch (keyEvent.key) {
      case 'ArrowDown':
        this.shiftFocusIndex(1);
        break;
      case 'ArrowUp':
        this.shiftFocusIndex(-1);
        break;
      case 'PageDown':
        this.shiftFocusIndex(10);
        break;
      case 'PageUp':
        this.shiftFocusIndex(-10);
        break;
      case 'Home':
        this.setFocusOnFirstItem();
        break;
      case 'End':
        this.setFocusOnLastItem();
        break;
      default:
        break;
    }
  }

  private shiftFocusIndex(numberOfItems: number) {
    // Handle up/down navigation when open
    const currentIndex = this.searchItems.indexOf(this.focusedItem);
    let newIndex;

    if (numberOfItems > 0) {
      newIndex = Math.min(this.searchItems.length - 1, currentIndex + 1);
    } else {
      newIndex = Math.max(0, currentIndex - 1);
    }

    if (newIndex !== currentIndex) {
      this.focusedItem = this.searchItems[newIndex];
    }
  }

  private setFocusOnFirstOrLastItem(keyEvent: KeyboardEvent): void {
    switch (keyEvent.key) {
      case 'ArrowUp':
      case 'PageUp':
      case 'Home':
        this.setFocusOnFirstItem();
        break;
      case 'ArrowDown':
      case 'PageDown':
      case 'End':
        this.setFocusOnLastItem();
        break;
      default:
        break;
    }
  }

  private setFocusOnLastItem(): void {
    if (this.searchItems.length > 0) {
      this.focusedItem = this.searchItems[this.searchItems.length - 1];
    }
  }

  private setFocusOnFirstItem(): void {
    if (this.searchItems.length > 0) {
      this.focusedItem = this.searchItems[0];
    }
  }

  private unlistenAllSlottedItems(): void {
    let disposeClickListener: EventListenerDisposeFn | undefined;
    while ((disposeClickListener = this.disposeItemClickListeners.pop()) !== undefined) {
      disposeClickListener();
    }
  }

  /**
   * Resolve a model/data item based on current `items` by comparing displayed text.
   * This is used to map an incoming form value or input `selectedItem` to an item
   * from the list.
   */
  private findItemByInput(input: string): unknown {
    if (!this.items || this.items.length === 0) {
      return input;
    }

    return this.items.find((it) => this.getItemText(it) === input) ?? input;
  }

  private setInputDisplayValue(value: string): void {
    // We intentionally update the DOM input imperatively ("hard way")
    // to ensure the visible value is cleared/updated immediately.
    if (this.textInput?.nativeElement) {
      this.textInput.nativeElement.value = value;
    }
  }

  private scrollFocusedItemIntoView(): void {
    const kirbyItems = this.getKirbyItems();
    if (!kirbyItems || kirbyItems.length === 0) return;

    const id = this.getItemId(this.focusedItem);
    if (!id) return;

    const match = kirbyItems.toArray().find((el) => {
      if (el.nativeElement.id === undefined) {
        throw new Error(
          'Each item must have an id attribute for scroll to work. Ensure that the itemIdProperty input is set correctly, and that each item has a unique id value.'
        );
      }
      return el.nativeElement.id === id;
    });
    match?.nativeElement?.scrollIntoView({ block: 'nearest' });
  }

  private getKirbyItems(): QueryList<ElementRef<HTMLElement>> | undefined {
    return this.kirbyItemsSlotted && this.kirbyItemsSlotted.length
      ? this.kirbyItemsSlotted
      : this.kirbyItemsDefault;
  }
}
