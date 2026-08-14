import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { HorizontalDirection, PopoverComponent } from '@kirbydesign/designsystem/popover';
import { AffixDirective, InputSize } from '@kirbydesign/designsystem/form-field';
import {
  EventListenerDisposeFn,
  FORM_FIELD_CONTROL,
  FormFieldControl,
} from '@kirbydesign/designsystem/types';
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
    {
      provide: FORM_FIELD_CONTROL,
      useExisting: forwardRef(() => ComboboxComponent),
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor, FormFieldControl
{
  private static readonly HEIGHT_OF_STANDARD_ITEM = 44;
  private state = OpenState.closed;
  private _popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  public _listboxId: string = UniqueIdGenerator.scopedTo('kirby-x-combobox').next();
  public _comboboxId: string = UniqueIdGenerator.scopedTo('kirby-input').next();

  private readonly _defaultSearchFunction = (
    searchTerm: string,
    itemsToSearch: unknown[]
  ): unknown[] => {
    if (!searchTerm) {
      return itemsToSearch;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return itemsToSearch
      .filter((item) => this.getItemText(item).toLowerCase().includes(lowerSearchTerm))
      .sort((a, b) => {
        const textA = this.getItemText(a).toLowerCase();
        const textB = this.getItemText(b).toLowerCase();

        const textAStartsWith = textA.startsWith(searchTerm);
        const textBStartsWith = textB.startsWith(searchTerm);
        if (textAStartsWith && textBStartsWith) {
          return this.compareAlphabetically(textA, textB);
        }

        if (textAStartsWith) {
          return -1;
        }

        if (textBStartsWith) {
          return 1;
        }

        return this.compareAlphabetically(textA, textB);
      });
  };

  private compareAlphabetically(textA: string, textB: string): number {
    if (textA < textB) {
      return -1;
    }
    if (textA > textB) {
      return 1;
    }
    return 0;
  }

  /**
   * The text to display when the search returns no results.
   */
  @Input()
  public noSearchResultsText = 'No results found.';

  /**
   * The text announced by screen readers when the selection is cleared.
   */
  @Input()
  public selectionClearedAnnouncement = 'Selection cleared.';

  public _liveRegionText = '';

  /**
   * The name of the property to use as the display text for each item.
   */
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

  /**
   * The height of each item in the dropdown, in pixels. This is used to calculate the height of the dropdown based on the number of items.
   */
  @Input()
  public itemHeight: number = 44;

  protected get dropdownMaxHeight(): number {
    return 8 * ComboboxComponent.HEIGHT_OF_STANDARD_ITEM;
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

  private isTypeString(item: unknown): boolean {
    return typeof item === 'string';
  }

  private objectHasItemTextProperty(item: unknown): boolean {
    return item != undefined && typeof item === 'object' && this.itemTextProperty in item;
  }

  private objectHasItemIdProperty(item: unknown): boolean {
    return item != undefined && typeof item === 'object' && this.itemIdProperty in item;
  }

  /**
   * The name of the property to use as the unique identifier for each item.
   */
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

    console.error(
      'Each item must have an id property for scroll to work. Ensure that the itemIdProperty input is set correctly, and that each item has a unique id value.'
    );
    return '';
  }

  /**
   * A function that takes a search term and the list of items, and returns a filtered list of items to display in the dropdown.
   */
  @Input()
  public searchFunction: (searchTerm: string, itemsToSearch: any[]) => any[] =
    this._defaultSearchFunction;

  private _searchItems: unknown[] = [];
  protected get searchItems(): unknown[] {
    return this._searchItems;
  }
  private set searchItems(value: unknown[]) {
    this._searchItems = value;
    if (!this._searchItems) {
      return;
    }

    // only set the focused item of the search result, if the input has value
    if (this.textInput?.nativeElement?.value) {
      this.focusedItem = this._searchItems[0];
      this._virtualScrollViewport?.scrollToIndex(0);
    }

    if (this.isOpen) {
      this.queueVisibleItemRangeSync();
    }
  }

  private _items: unknown[] = [];

  get items(): unknown[] {
    return this._items;
  }

  /**
   * The list of items to display in the dropdown.
   * @param value
   */
  @Input()
  public set items(value: unknown[]) {
    this._items = value;
    this.searchItems = this._items;
  }

  private _selectedItem: unknown = undefined;
  get selectedItem(): unknown {
    return this._selectedItem;
  }

  /**
   * The currently selected item.
   * @param value
   */
  @Input()
  public set selectedItem(value: unknown) {
    // Allow clearing by setting undefined
    if (value !== this._selectedItem) {
      this._selectedItem = value;
      this.focusedItem = this._selectedItem;
      // Keep ControlValueAccessor value in sync with the selected data item
      this.value = this._selectedItem;
      this.setInputDisplayValue(this.getItemText(this.selectedItem));
    }
  }

  // _focusedItem keeps track of which element has focus and will be selected
  // if it is activated (by pressing ENTER)
  private _focusedItem: unknown = undefined;
  public get focusedItem(): unknown {
    return this._focusedItem;
  }

  public set focusedItem(item: unknown) {
    // the focus might not have changed, but where in the list might
    this.setAriaPosinsetOnElement(item);

    if (this._focusedItem === item) {
      return;
    }

    this._focusedItem = item;
  }

  protected firstVisibleItemIndex = 0;
  protected lastVisibleItemIndex = 0;
  private pendingVisibleItemRangeSync: number | null = null;

  protected isFirstVisibleItem(index: number): boolean {
    return index === this.firstVisibleItemIndex;
  }

  protected isLastVisibleItem(index: number): boolean {
    return index === this.lastVisibleItemIndex;
  }

  protected onViewportScrolledIndexChange(index: number): void {
    this.queueVisibleItemRangeSync(index);
  }

  private getIndexOfItem(item: unknown): number {
    return this.searchItems.indexOf(item);
  }

  private getKirbyElement(item: unknown | undefined): ElementRef<HTMLElement> | undefined {
    const kirbyItems = this.getKirbyItems();
    if (!kirbyItems || !item) {
      return undefined;
    }

    const itemId = this.getItemId(item);
    return kirbyItems.find((el) => el.nativeElement.id === itemId);
  }

  private setAriaPosinsetOnElement(item: unknown) {
    const element = this.getKirbyElement(item);
    const index = this.getIndexOfItem(item);
    const setsize = this.searchItems.length;

    if (!element) {
      return;
    }

    this.renderer.setAttribute(element.nativeElement, 'aria-setsize', setsize.toString());
    this.renderer.setAttribute(element.nativeElement, 'aria-posinset', `${index + 1}`);
  }

  /**
   * The placeholder text to display in the input when no item is selected and the input is empty.
   */
  @Input()
  public placeholder = 'Please search...';

  /**
   * The direction in which the dropdown should open relative to the input.
   * @param direction
   */
  @Input()
  public set popout(direction: HorizontalDirection | `${HorizontalDirection}`) {
    this._popout = direction || HorizontalDirection.right;
  }

  public get popout() {
    return this._popout;
  }

  /**
   * If the combobox needs to expand to full width of its parent container, then use expand.
   */
  @Input()
  public expand?: 'block';

  /**
   * When `true`, the user cannot interact with the combobox.
   */
  @Input()
  public disabled = false;

  @HostBinding('attr.disabled')
  public get _isDisabled(): 'disabled' | null {
    return this.disabled ? 'disabled' : null;
  }

  /**
   * Will emit the new value when error changes.
   */
  @Output()
  hasErrorChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _hasError: boolean = false;

  /**
   * When `true`, the combobox will be styled with error styles.
   */
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

  /**
   * The size of the input element.
   */
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
  public change: EventEmitter<any> = new EventEmitter<any>();

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

  @HostBinding('class.has-value')
  public get hasValue(): boolean {
    return this.selectedItem != null;
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

  @ViewChild(InputComponent, { static: true, read: ElementRef })
  private textInput!: ElementRef<HTMLInputElement>;

  get interactiveElement(): HTMLElement {
    return this.textInput.nativeElement;
  }

  @ViewChild(CdkVirtualScrollViewport)
  public _virtualScrollViewport?: CdkVirtualScrollViewport;

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
    if (this.pendingVisibleItemRangeSync !== null) {
      cancelAnimationFrame(this.pendingVisibleItemRangeSync);
      this.pendingVisibleItemRangeSync = null;
    }
    this.unlistenAllSlottedItems();
    this.unobserveResize();
  }

  public open(): void {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen) {
      this.state = OpenState.opening;
      this.showPopOver();
      this.focusedItem = this.selectedItem;
    }
  }

  private showPopOver() {
    if (this.state === OpenState.opening) {
      this.state = OpenState.open;
      this.popover?.show();
      this.cdr.markForCheck();
      // PopoverComponent.show() appends the element to document.body synchronously but
      // finishes positioning in a requestAnimationFrame. One rAF is enough to let the
      // browser compute layout so the CDK viewport has a real size before we scroll.
      requestAnimationFrame(() => this.scrollToIndexIntoViewWhenOpeningPopup());
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

  protected onInput(event: Event): void {
    if (!this.isOpen) {
      this.open();
    }

    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.clearSelection();
    }

    this.updateSearchResults(input.value);

    // Screen readers (VoiceOver/NVDA) may move real browser focus to a list-item button.
    // When the list re-renders after filtering, that button is removed from the DOM and
    // focus falls to `document.body`. Restore it to the input so the user can keep typing
    // and the focusout handler doesn't mistake the body-focus for a genuine blur-away.
    if (document.activeElement !== this.textInput?.nativeElement) {
      this.textInput?.nativeElement.focus();
    }
  }

  private clearSelection(): void {
    this.selectItem(undefined);
    // Reset after a short delay so the same message can be announced again on subsequent clears
    this.announce(this.selectionClearedAnnouncement);
  }

  private _announceTimeout: ReturnType<typeof setTimeout> | undefined;
  private announce(message: string): void {
    clearTimeout(this._announceTimeout);
    this._liveRegionText = '';
    this._announceTimeout = setTimeout(() => {
      this._liveRegionText = message;
      this.cdr.markForCheck();
    }, 100);
  }

  private updateSearchResults(inputValue: string): void {
    this.searchItems = inputValue ? this.searchFunction(inputValue, this.items) : this.items;

    if (inputValue && this.searchItems.length === 0) {
      this.announce(this.noSearchResultsText);
    }
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

  @HostListener('focusout')
  public onFocusOut() {
    // Defer the check to allow the browser (and screen readers like VoiceOver/NVDA)
    // to settle focus. `relatedTarget` is often `null` with screen readers, so we
    // inspect `document.activeElement` after the microtask queue has flushed.
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement | null;
      const isOnTriggerButton =
        activeElement && this.elementRef.nativeElement.contains(activeElement);
      const isInsidePopover = activeElement && activeElement.closest('kirby-popover');

      if (isOnTriggerButton || isInsidePopover) {
        // Focus is still within the component — nothing to do.
        return;
      }

      // When a screen reader (VoiceOver/NVDA) moves real focus to a list-item button
      // and the user then types a character, CDK virtual scroll re-renders the list and
      // removes the focused button from the DOM. The browser then drops focus to
      // `document.body`. Detect this case: if the popover is still showing and focus is
      // on the body, it means focus was lost due to DOM removal — restore it to the
      // input rather than closing the popover.
      if (this.isOpen && activeElement === document.body) {
        this.textInput?.nativeElement.focus();
        return;
      }

      if (this.isOpen) {
        this.close();
      }
      this.onTouched();
    }, 0);
  }

  @HostListener('keydown.tab')
  public onTab() {
    if (this.isOpen) {
      this.selectItem(this.focusedItem);
      this.close();
    }
  }

  @HostListener('keydown.escape')
  public onEscape() {
    this.close();
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnter(event: Event) {
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
    this.scrollFocusedItemIntoViewWhileNavigating();
  }

  private setFocusOnFirstOrLastItem(keyEvent: KeyboardEvent): void {
    switch (keyEvent.key) {
      case 'ArrowDown':
      case 'PageDown':
      case 'Home':
        this.setFocusOnFirstItem();
        break;
      case 'ArrowUp':
      case 'PageUp':
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

  private unobserveResize() {
    this.resizeObserverService.unobserve(this.elementRef);
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
    if (this.interactiveElement) {
      this.renderer.setProperty(this.interactiveElement, 'value', value);
    }
  }

  private scrollFocusedItemIntoViewWhileNavigating(): void {
    if (!this.focusedItem || !this._virtualScrollViewport) {
      return;
    }

    const focusedIndex = this.searchItems.indexOf(this.focusedItem);
    if (focusedIndex === -1) return;

    const itemTop = focusedIndex * this.itemHeight;
    const itemBottom = itemTop + this.itemHeight;
    const scrollOffset = this._virtualScrollViewport.measureScrollOffset();
    const viewportSize = this._virtualScrollViewport.getViewportSize();

    if (itemTop < scrollOffset) {
      // Item is above the visible area — scroll up so item appears at the top.
      this._virtualScrollViewport.scrollToOffset(itemTop);
    } else if (itemBottom > scrollOffset + viewportSize) {
      // Item is below the visible area — scroll down so item appears at the bottom.
      this._virtualScrollViewport.scrollToOffset(itemBottom - viewportSize);
    }

    this._virtualScrollViewport.checkViewportSize();
    this.queueVisibleItemRangeSync();
  }

  private getKirbyItems(): QueryList<ElementRef<HTMLElement>> | undefined {
    return this.kirbyItemsSlotted && this.kirbyItemsSlotted.length
      ? this.kirbyItemsSlotted
      : this.kirbyItemsDefault;
  }

  private scrollToIndexIntoViewWhenOpeningPopup(): void {
    const focusedIndex = this.searchItems.indexOf(this.focusedItem);

    this._virtualScrollViewport?.checkViewportSize();

    this._virtualScrollViewport?.scrollToIndex(focusedIndex);
    this.queueVisibleItemRangeSync();
  }

  private queueVisibleItemRangeSync(scrolledIndex?: number): void {
    if (this.pendingVisibleItemRangeSync !== null) {
      cancelAnimationFrame(this.pendingVisibleItemRangeSync);
    }
    this.pendingVisibleItemRangeSync = requestAnimationFrame(() => {
      this.pendingVisibleItemRangeSync = null;
      this.syncVisibleItemRange(scrolledIndex);
    });
  }

  private syncVisibleItemRange(scrolledIndex?: number): void {
    if (!this._virtualScrollViewport || this.searchItems.length === 0) {
      this.firstVisibleItemIndex = 0;
      this.lastVisibleItemIndex = 0;
      this.cdr.markForCheck();
      return;
    }

    const viewportSize = this._virtualScrollViewport.getViewportSize();
    const firstVisibleIndex =
      scrolledIndex ??
      Math.floor(this._virtualScrollViewport.measureScrollOffset() / this.itemHeight);
    const visibleItemCount = Math.max(1, Math.ceil(viewportSize / this.itemHeight));
    const lastVisibleIndex = Math.min(
      this.searchItems.length - 1,
      firstVisibleIndex + visibleItemCount - 1
    );

    this.firstVisibleItemIndex = firstVisibleIndex;
    this.lastVisibleItemIndex = lastVisibleIndex;
    this.cdr.markForCheck();
  }
}
