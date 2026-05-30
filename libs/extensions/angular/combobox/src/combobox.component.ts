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
  static readonly OPEN_DELAY_IN_MS = 100;

  // ─── IDs ──────────────────────────────────────────────────────────────────

  public _listboxId: string = UniqueIdGenerator.scopedTo('kirby-x-combobox').next();
  public _comboboxId: string = UniqueIdGenerator.scopedTo('kirby-input').next();

  // ─── State ────────────────────────────────────────────────────────────────

  private state = OpenState.closed;
  private _openTimeout: ReturnType<typeof setTimeout> | undefined;

  @HostBinding('class.is-opening')
  public get _isOpening(): boolean {
    return this.state === OpenState.opening;
  }

  @HostBinding('class.is-open')
  public get isOpen(): boolean {
    return this.state === OpenState.open;
  }

  // ─── Inputs ───────────────────────────────────────────────────────────────

  /**
   * The text to display when the search returns no results.
   */
  @Input() public noSearchResultsText = 'No results found';

  /**
   * The text announced by screen readers when the selection is cleared.
   */
  @Input() public selectionClearedAnnouncement = 'Selection cleared';

  /**
   * The name of the property to use as the display text for each item.
   */
  @Input() public itemTextProperty = 'text';

  /**
   * The name of the property to use as the unique identifier for each item.
   */
  @Input() public itemIdProperty = 'id';

  /**
   * The height of each item in the dropdown, in pixels.
   */
  @Input() public itemHeight = 44;

  /**
   * The placeholder text to display in the input when no item is selected and the input is empty.
   */
  @Input() public placeholder = 'Please search...';

  /**
   * If the combobox needs to expand to full width of its parent container, then use expand.
   */
  @Input() public expand?: 'block';

  /**
   * When `true`, the user cannot interact with the combobox.
   */
  @Input() public disabled = false;

  /**
   * The size of the input element.
   */
  @Input() public size: InputSize = InputSize.medium;

  /**
   * The direction in which the dropdown should open relative to the input.
   */
  @Input()
  public set popout(direction: HorizontalDirection | `${HorizontalDirection}`) {
    this._popout = direction || HorizontalDirection.right;
  }
  public get popout() {
    return this._popout;
  }
  private _popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;

  /**
   * A function that takes a search term and the list of items, and returns a filtered list.
   */
  @Input() public searchFunction: (searchTerm: string, itemsToSearch: unknown[]) => unknown[] = (
    searchTerm,
    items
  ) => this.defaultSearch(searchTerm, items);

  /**
   * The list of items to display in the dropdown.
   */
  @Input()
  public set items(value: unknown[]) {
    this._items = value;
    this.searchItems = this._items;
  }
  public get items(): unknown[] {
    return this._items;
  }
  private _items: unknown[] = [];

  /**
   * The currently selected item.
   */
  @Input()
  public set selectedItem(value: unknown) {
    if (value === this._selectedItem) return;
    this._selectedItem = value;
    this.focusedItem = value;
    this.value = value;
  }
  public get selectedItem(): unknown {
    return this._selectedItem;
  }
  private _selectedItem: unknown = undefined;

  // ─── Outputs ──────────────────────────────────────────────────────────────

  /**
   * Will emit the new value when error changes.
   */
  @Output() hasErrorChange = new EventEmitter<boolean>();

  /**
   * When `true`, the combobox will be styled with error styles.
   */
  @Input()
  public get hasError(): boolean {
    return this._hasError;
  }
  public set hasError(value: boolean) {
    if (this._hasError === value) return;
    this._hasError = value;
    this.hasErrorChange.emit(this._hasError);
  }
  private _hasError = false;

  /**
   * Emitted when an item is selected (tap on mobile, click/keypress on web).
   */
  @Output() public change = new EventEmitter<unknown>();

  // ─── Host bindings ────────────────────────────────────────────────────────

  @HostBinding('attr.disabled')
  public get _isDisabled(): 'disabled' | null {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('attr.no-blur')
  public get _noBlurOnScroll(): boolean {
    return true;
  }

  @HostBinding('class.expand')
  public get _isBlockLevel() {
    return this.expand === 'block';
  }

  @HostBinding('class.has-value')
  public get hasValue(): boolean {
    return this.selectedItem != null;
  }

  // ─── View / content queries ───────────────────────────────────────────────

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

  @ViewChild(CdkVirtualScrollViewport)
  private virtualScrollViewport?: CdkVirtualScrollViewport;

  @ViewChildren(ItemComponent, { read: ElementRef })
  public kirbyItemsDefault?: QueryList<ElementRef<HTMLElement>>;

  @ContentChildren(ItemComponent, { read: ElementRef })
  public set kirbyItemsSlotted(kirbyItems: QueryList<ElementRef<HTMLElement>>) {
    if (this.disposeItemClickListeners.length > 0) {
      this.unlistenAllSlottedItems();
    }

    kirbyItems.forEach((kirbyItem) => {
      this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
      const dispose = this.renderer.listen(kirbyItem.nativeElement, 'click', () => {
        const id = kirbyItem.nativeElement.getAttribute('id');
        const item = this.items.find((it) => this.getItemId(it) === id);
        if (item) this.onItemSelect(item);
      });
      this.disposeItemClickListeners.push(dispose);
    });

    this._kirbyItemsSlotted = kirbyItems;
  }
  public get kirbyItemsSlotted(): QueryList<ElementRef<HTMLElement>> | undefined {
    return this._kirbyItemsSlotted;
  }
  private _kirbyItemsSlotted?: QueryList<ElementRef<HTMLElement>>;

  private disposeItemClickListeners: EventListenerDisposeFn[] = [];

  // ─── Focused item ─────────────────────────────────────────────────────────

  // Tracks which item will be selected when the user presses Enter.
  private _focusedItem: unknown = undefined;

  public get focusedItem(): unknown {
    return this._focusedItem;
  }
  public set focusedItem(item: unknown) {
    this.setAriaPosinsetOnElement(item);
    if (this._focusedItem !== item) {
      this._focusedItem = item;
    }
  }

  // ─── Search items ─────────────────────────────────────────────────────────

  private _searchItems: unknown[] = [];

  protected get searchItems(): unknown[] {
    return this._searchItems;
  }
  private set searchItems(value: unknown[]) {
    this._searchItems = value ?? [];
    // Focus the first search result only when the input has an active search term.
    if (this._searchItems.length > 0 && this.textInput?.nativeElement?.value) {
      this.focusedItem = this._searchItems[0];
    }
  }

  // ─── Viewport sizing ──────────────────────────────────────────────────────

  protected get dropdownMaxHeight(): number {
    return 8 * this.itemHeight;
  }

  protected get dropdownMinHeight(): number {
    return this.itemHeight;
  }

  protected get viewportHeight(): number {
    const itemCount = this.searchItems.length;
    if (itemCount === 0) return this.dropdownMinHeight;
    return Math.min(
      this.dropdownMaxHeight,
      Math.max(this.dropdownMinHeight, itemCount * this.itemHeight)
    );
  }

  // ─── Live region ──────────────────────────────────────────────────────────

  public _liveRegionText = '';
  private _announceTimeout: ReturnType<typeof setTimeout> | undefined;

  private announce(message: string): void {
    clearTimeout(this._announceTimeout);
    this._liveRegionText = '';
    this.cdr.markForCheck();
    this._announceTimeout = setTimeout(() => {
      this._liveRegionText = message;
      this.cdr.markForCheck();
    }, 100);
  }

  // ─── ControlValueAccessor ─────────────────────────────────────────────────

  public value: unknown = undefined;

  private onChange: (value: unknown) => void = () => {
    /* noop */
  };
  private onTouched: () => void = () => {
    /* noop */
  };

  public writeValue(value: string): void {
    this.selectItemByInput(value);
    this.setInputDisplayValue(this.getItemText(this.value));
    this.cdr.markForCheck();
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // ─── FormFieldControl ─────────────────────────────────────────────────────

  private readonly _attributesToForward = ['aria-label', 'aria-labelledby'];

  public get interactiveElement(): HTMLElement {
    return this.textInput.nativeElement;
  }

  // ─── Constructor ──────────────────────────────────────────────────────────

  public constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private resizeObserverService: ResizeObserverService
  ) {}

  // ─── Lifecycle hooks ──────────────────────────────────────────────────────

  public ngAfterViewInit() {
    if (this.expand === 'block') {
      const { width: initialWidth } = this.elementRef.nativeElement.getBoundingClientRect();
      this.setPopoverCardStyle('max-width', 'initial');
      this.setPopoverCardStyle('min-width', 'initial');
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

  public ngOnDestroy(): void {
    clearTimeout(this._openTimeout);
    clearTimeout(this._announceTimeout);
    this.unlistenAllSlottedItems();
    this.resizeObserverService.unobserve(this.elementRef);
  }

  // ─── Open / close ─────────────────────────────────────────────────────────

  public open(): void {
    if (this.disabled || this.isOpen) return;

    this.state = OpenState.opening;
    this.focusedItem = this.selectedItem;
    this._openTimeout = setTimeout(() => this.showPopOver(), ComboboxComponent.OPEN_DELAY_IN_MS);
  }

  private showPopOver(): void {
    if (this.state !== OpenState.opening) return;

    this.state = OpenState.open;
    this.popover?.show();
    this.scrollToIndexIntoViewWhenOpeningPopup();
    this.cdr.markForCheck();
  }

  public close(): void {
    if (this.disabled || !this.isOpen) return;

    clearTimeout(this._openTimeout);
    this.state = OpenState.closed;
    this.setInputDisplayValue(this.getItemText(this.selectedItem));
    this.searchItems = this.items;
    this.popover?.hide();
  }

  private toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  // ─── Event handlers ───────────────────────────────────────────────────────

  protected onToggle(event: MouseEvent): void {
    event.stopPropagation();
    this.textInput?.nativeElement.focus();
    this.toggle();
  }

  protected onItemSelect(item: unknown): void {
    if (item instanceof HTMLElement) return;
    this.selectItem(item);
    this.close();
  }

  protected onInput(event: Event): void {
    if (!this.isOpen) this.open();

    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.clearSelection();
    }

    this.updateSearchResults(input.value);

    // Screen readers (VoiceOver/NVDA) may move real focus to a list-item button.
    // When the list re-renders after filtering, that button is removed and focus falls
    // to `document.body`. Restore it to the input so the user can keep typing.
    if (document.activeElement !== this.textInput?.nativeElement) {
      this.textInput?.nativeElement.focus();
    }
  }

  protected onPopoverWillHide(): void {
    this.state = OpenState.closed;
    this.rootElement.nativeElement.focus();
    this.onTouched();
  }

  protected onPopoverClick(): void {
    this.close();
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent): void {
    if (this.isOpen) {
      event.stopPropagation();
    }
  }

  @HostListener('focusout')
  public onFocusOut(): void {
    // Defer to allow browser/screen readers to settle focus.
    // `relatedTarget` is often null with screen readers so we check `document.activeElement`.
    setTimeout(() => {
      const active = document.activeElement as HTMLElement | null;
      const isInsideComponent = active && this.elementRef.nativeElement.contains(active);
      const isInsidePopover = active && active.closest('kirby-popover');

      if (isInsideComponent || isInsidePopover) return;

      // VoiceOver/NVDA can drop focus to body when CDK re-renders the list;
      // restore focus to the input instead of closing.
      if (this.isOpen && active === document.body) {
        this.textInput?.nativeElement.focus();
        return;
      }

      if (this.isOpen) this.close();
      this.onTouched();
    }, 0);
  }

  // ─── Keyboard handlers ────────────────────────────────────────────────────

  @HostListener('keydown.tab')
  public onTab(): void {
    if (this.isOpen) {
      this.selectItem(this.focusedItem);
      this.close();
    }
  }

  @HostListener('keydown.escape')
  public onEscape(): void {
    this.close();
  }

  @HostListener('keydown.enter', ['$event'])
  public onEnter(event: Event): void {
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

    const keyEvent = event as KeyboardEvent;
    event.preventDefault();

    if (!this.isOpen) {
      this.open();

      if (!this.selectedItem) {
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
    }
  }

  private shiftFocusIndex(delta: number): void {
    const currentIndex = this.searchItems.indexOf(this.focusedItem);
    const newIndex = Math.max(0, Math.min(this.searchItems.length - 1, currentIndex + delta));

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
    }
  }

  private setFocusOnFirstItem(): void {
    if (this.searchItems.length > 0) {
      this.focusedItem = this.searchItems[0];
    }
  }

  private setFocusOnLastItem(): void {
    if (this.searchItems.length > 0) {
      this.focusedItem = this.searchItems[this.searchItems.length - 1];
    }
  }

  // ─── Item selection ───────────────────────────────────────────────────────

  private selectItem(item: unknown): void {
    if (item === this.selectedItem) return;

    this.selectedItem = item;
    this.change.emit(this.value);
    this.onChange(this.value);
    this.setInputDisplayValue(this.getItemText(item));
    this.searchItems = this.items;
  }

  private selectItemByInput(input: string): void {
    this.selectedItem = this.findItemByInput(input);
  }

  private clearSelection(): void {
    this.selectItem(undefined);
    this.announce(this.selectionClearedAnnouncement);
  }

  private updateSearchResults(inputValue: string): void {
    this.searchItems = inputValue ? this.searchFunction(inputValue, this.items) : this.items;

    if (inputValue && this.searchItems.length === 0) {
      this.announce(this.noSearchResultsText);
    }
  }

  // ─── Item resolution ──────────────────────────────────────────────────────

  protected getItemText(item: unknown): string {
    if (typeof item === 'string') return item;

    if (this.objectHasProperty(item, this.itemTextProperty)) {
      const value = (item as Record<string, unknown>)[this.itemTextProperty];
      if (typeof value === 'string') return value;
    }

    return '';
  }

  protected getItemId(item: unknown): string {
    if (typeof item === 'string') return item;

    if (this.objectHasProperty(item, this.itemIdProperty)) {
      const value = (item as Record<string, unknown>)[this.itemIdProperty];
      if (typeof value === 'string') return value;
    }

    console.error(
      'Each item must have an id property for scroll to work. ' +
        'Ensure that the itemIdProperty input is set correctly, and that each item has a unique id value.'
    );
    return '';
  }

  private objectHasProperty(item: unknown, property: string): boolean {
    return item != null && typeof item === 'object' && property in item;
  }

  /**
   * Resolve a data item from `items` by comparing displayed text.
   * Falls back to the raw input string if no match is found.
   */
  private findItemByInput(input: string): unknown {
    if (!this.items?.length) return input;
    return this.items.find((it) => this.getItemText(it) === input) ?? input;
  }

  // ─── Default search ───────────────────────────────────────────────────────

  private defaultSearch(searchTerm: string, itemsToSearch: unknown[]): unknown[] {
    if (!searchTerm) return itemsToSearch;

    const lower = searchTerm.toLowerCase();
    const scored = itemsToSearch
      .map((item) => ({ item, text: this.getItemText(item).toLowerCase() }))
      .filter(({ text }) => text.includes(lower));

    scored.sort((a, b) => {
      const aStarts = a.text.startsWith(lower);
      const bStarts = b.text.startsWith(lower);
      if (aStarts !== bStarts) return aStarts ? -1 : 1;
      return a.text.localeCompare(b.text);
    });

    return scored.map(({ item }) => item);
  }

  // ─── Scroll ───────────────────────────────────────────────────────────────

  private scrollFocusedItemIntoViewWhileNavigating(): void {
    if (!this.focusedItem) return;

    const id = this.getItemId(this.focusedItem);
    if (!id) return;

    const kirbyItems = this.getKirbyItems();
    if (!kirbyItems?.length) return;

    const match = kirbyItems.toArray().find((el) => {
      if (el.nativeElement.id === undefined) {
        console.error(
          'Each item must have an id attribute for scroll to work. ' +
            "Ensure that the '[attr.id]' binding is set correctly."
        );
      }
      return el.nativeElement.id === id;
    });

    if (!match) {
      this.scrollToIndexIntoViewWhenOpeningPopup();
      return;
    }

    match.nativeElement.scrollIntoView?.({ block: 'nearest' });
  }

  private scrollToIndexIntoViewWhenOpeningPopup(): void {
    const focusedIndex = this.searchItems.indexOf(this.focusedItem);
    if (focusedIndex < 0) return;

    if (focusedIndex === 0) {
      this.virtualScrollViewport?.setRenderedRange({ start: 0, end: 20 });
      this.virtualScrollViewport?.checkViewportSize();
    } else {
      this.virtualScrollViewport?.scrollToIndex(focusedIndex);
    }
  }

  // ─── Aria helpers ─────────────────────────────────────────────────────────

  private setAriaPosinsetOnElement(item: unknown): void {
    const element = this.getKirbyElement(item);
    if (!element) return;

    const index = this.searchItems.indexOf(item);
    const setsize = this.searchItems.length;
    this.renderer.setAttribute(element.nativeElement, 'aria-setsize', setsize.toString());
    this.renderer.setAttribute(element.nativeElement, 'aria-posinset', `${index + 1}`);
  }

  private getKirbyElement(item: unknown): ElementRef<HTMLElement> | undefined {
    const kirbyItems = this.getKirbyItems();
    if (!kirbyItems || !item) return undefined;

    const itemId = this.getItemId(item);
    return kirbyItems.find((el) => el.nativeElement.id === itemId);
  }

  private getKirbyItems(): QueryList<ElementRef<HTMLElement>> | undefined {
    return this.kirbyItemsSlotted?.length ? this.kirbyItemsSlotted : this.kirbyItemsDefault;
  }

  // ─── Popover card styles ──────────────────────────────────────────────────

  private setPopoverCardStyle(style: string, value: string): void {
    this.renderer.setStyle(
      this.cardElement?.nativeElement,
      style,
      value,
      RendererStyleFlags2.DashCase
    );
  }

  private forwardAriaLabelToCombobox(): void {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.rootElement.nativeElement
    );
  }

  private setInputDisplayValue(value: string): void {
    // Update the DOM input directly to ensure the visible value is cleared/updated immediately,
    // bypassing Angular's change detection cycle.
    if (this.textInput?.nativeElement) {
      this.renderer.setProperty(this.textInput.nativeElement, 'value', value);
    }
  }

  // ─── Cleanup ──────────────────────────────────────────────────────────────

  private unlistenAllSlottedItems(): void {
    let dispose: EventListenerDisposeFn | undefined;
    while ((dispose = this.disposeItemClickListeners.pop()) !== undefined) {
      dispose();
    }
  }
}
