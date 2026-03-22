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
import { AffixDirective, InputSize } from '@kirbydesign/designsystem/form-field';
import { EventListenerDisposeFn } from '@kirbydesign/designsystem/types';
import { forwardAttributes, ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { InputComponent } from '@kirbydesign/designsystem/form-field';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { NgTemplateOutlet } from '@angular/common';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { OpenState } from './combobox.types';

@Component({
  selector: 'kirby-x-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
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
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
  ],
})
export class ComboboxComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  static readonly OPEN_DELAY_IN_MS = 100;
  private state = OpenState.closed;
  private _popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  public _listboxId: string = UniqueIdGenerator.scopedTo('kirby-x-combobox').next();
  public _comboboxId: string = UniqueIdGenerator.scopedTo('kirby-input').next();

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
  public noSearchResultsText = 'No results found.';

  @Input()
  public itemTextProperty: string = 'text';
  protected getItemText(item: unknown): string {
    if (this.isTypeString(item)) {
      return item as string;
    }

    if (this.objectHasItemTextProperty(item)) {
      const objectItem = item as Record<string, unknown>;
      const textValue: unknown = objectItem[this.itemTextProperty];

      if (typeof textValue === 'string') {
        return textValue;
      }
    }
    return '';
  }

  protected itemHeight: number = 44;
  protected get dropdownMaxHeight(): number {
    return 8 * this.itemHeight;
  }

  protected get dropdownMinHeight(): number {
    return this.itemHeight;
  }

  protected get viewportHeight(): number {
    const itemCount = this.searchItems?.length ?? 0;

    if (itemCount === 0) {
      return this.dropdownMinHeight;
    }

    return Math.min(
      this.dropdownMaxHeight,
      Math.max(this.dropdownMinHeight, itemCount * this.itemHeight)
    );
  }
  protected getItemHeight(item: ElementRef<HTMLElement> | undefined): number {
    let itemSize = this.itemHeight;
    if (item) {
      const templateElement = item.nativeElement as HTMLElement;
      const computedStyle = getComputedStyle(templateElement);
      const pixelHeight = computedStyle.height;
      const height = parseFloat(pixelHeight);
      if (height) {
        itemSize = height;
      }
    }

    return itemSize;
  }

  private isTypeString(item: unknown): boolean {
    return typeof item === 'string';
  }

  private objectHasItemTextProperty(item: unknown): boolean {
    return item != undefined && typeof item === 'object' && this.itemTextProperty in item;
  }

  private objectHasItemIdProperty(item: unknown): boolean {
    return item != undefined && typeof item === 'object' && this.itemIdProperty in item;
  }

  @Input()
  public itemIdProperty = 'id';
  protected getItemId(item: unknown): string {
    if (this.isTypeString(item)) {
      return item as string;
    }

    if (this.objectHasItemIdProperty(item)) {
      const objectItem = item as Record<string, unknown>;
      const idValue: unknown = objectItem[this.itemIdProperty];

      if (this.isTypeString(idValue)) {
        return idValue as string;
      }
    }

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
  public get focusedItem(): unknown {
    return this._focusedItem;
  }

  public set focusedItem(item: unknown) {
    if (this._focusedItem !== item) {
      this._focusedItem = item;
      this.scrollFocusedItemIntoViewWhileNavigating();
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

  public value: unknown = undefined;

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

  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  public itemTemplate?: TemplateRef<unknown>;

  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  public slottedItems?: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(CardComponent, { read: ElementRef })
  public cardElement?: ElementRef<HTMLElement>;

  @ViewChild(PopoverComponent)
  public popover?: PopoverComponent;

  @ViewChild('rootElement', { static: true, read: ElementRef })
  public rootElement!: ElementRef<HTMLElement>;

  @ViewChild(InputComponent, { read: ElementRef })
  private textInput?: ElementRef<HTMLInputElement>;

  @ViewChild(CdkVirtualScrollViewport)
  private virtualScrollViewport?: CdkVirtualScrollViewport;

  private forwardAriaLabelToCombobox() {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.rootElement.nativeElement
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

    // when using slotted items, we need to calculate the item height based on the items.
    // not all items will be rendered at the same time due to virtual scroll,
    // so we can only calculate the height based on the first item.
    this.itemHeight = this.getItemHeight(kirbyItems.first);

    kirbyItems.forEach((kirbyItem) => {
      this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
      const disposeClickListener: EventListenerDisposeFn = this.renderer.listen(
        kirbyItem.nativeElement,
        'click',
        () => {
          const id = kirbyItem.nativeElement.getAttribute('id');
          const item = this.items.find((it) => this.getItemId(it) === id);
          if (item) {
            this.onItemSelect(item);
          }
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
    this.forwardAriaLabelToCombobox();
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
    if (!this.rootElement) {
      throw new Error('requires the component to function properly');
    }
  }

  public open(): void {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      this.state = OpenState.opening;
      setTimeout(() => this.showPopOver(), ComboboxComponent.OPEN_DELAY_IN_MS);

      this.focusedItem = this.selectedItem;
    }
  }

  private showPopOver() {
    if (this.state === OpenState.opening) {
      this.state = OpenState.open;
      this.popover?.show();
      this.scrollToIndexIntoViewWhenOpeningPopup();
      this.cdr.markForCheck();
    }
  }

  public close() {
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

  protected updateSearchResults(event: Event): void {
    if (!this.isOpen) {
      this.open();
    }

    const input = event.target as HTMLInputElement;
    this.searchItems = input.value ? this.searchFunction(input.value) : this.items;
  }

  protected onPopoverWillHide() {
    this.state = OpenState.closed;
    this.rootElement.nativeElement.focus();
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
      if (this.selectedItem) {
        this.setFocusOnSelectedItem();
      } else {
        this.setFocusOnFirstOrLastItem(keyEvent);
      }
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
      newIndex = Math.min(this.searchItems.length - 1, currentIndex + numberOfItems);
    } else {
      newIndex = Math.max(0, currentIndex + numberOfItems);
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

  private setFocusOnSelectedItem(): void {
    if (this.selectedItem) {
      this.focusedItem = this.selectedItem;
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
      this.renderer.setProperty(this.textInput.nativeElement, 'value', value);
    }
  }

  private scrollFocusedItemIntoViewWhileNavigating(): void {
    const kirbyItems = this.getKirbyItems();
    if (!kirbyItems || kirbyItems.length === 0) return;

    if (!this.focusedItem) {
      return;
    }

    const id = this.getItemId(this.focusedItem);
    if (!id) return;

    const match = kirbyItems.toArray().find((el) => {
      if (el.nativeElement.id === undefined) {
        throw new Error(
          'Each item must have an id attribute for scroll to work. Ensure that the ´[attr.id]´ is set correctly, and that each item has a unique id value.'
        );
      }
      return el.nativeElement.id === id;
    });

    if (!match) return;

    const scrollIntoView = match.nativeElement.scrollIntoView;
    if (typeof scrollIntoView === 'function') {
      scrollIntoView.call(match.nativeElement, { block: 'nearest' });
    }
  }

  private getKirbyItems(): QueryList<ElementRef<HTMLElement>> | undefined {
    return this.kirbyItemsSlotted && this.kirbyItemsSlotted.length
      ? this.kirbyItemsSlotted
      : this.kirbyItemsDefault;
  }

  private scrollToIndexIntoViewWhenOpeningPopup(): void {
    const focusedIndex = this.searchItems.indexOf(this.focusedItem);
    if (focusedIndex < 0) return;

    const offset =
      this.dropdownMaxHeight > focusedIndex * this.itemHeight ? 0 : focusedIndex * this.itemHeight;
    this.virtualScrollViewport?.scrollToOffset(offset, 'instant');
  }
}
