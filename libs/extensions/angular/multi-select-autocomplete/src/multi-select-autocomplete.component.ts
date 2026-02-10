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
import { FormFieldComponent, InputSize } from '@kirbydesign/designsystem/form-field';
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
      useExisting: forwardRef(() => MultiSelectAutocomplete),
      multi: true,
    },
  ],
  imports: [
    FormFieldComponent,
    InputComponent,
    NgTemplateOutlet,
    PopoverComponent,
    CardComponent,
    ItemComponent,
    IconComponent,
  ],
})
export class MultiSelectAutocomplete
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  static readonly OPEN_DELAY_IN_MS = 100;
  private state = OpenState.closed;
  private _popout: HorizontalDirection | `${HorizontalDirection}` = HorizontalDirection.right;
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  protected dropdownId: string = UniqueIdGenerator.scopedTo('kirby-dropdown').next();
  protected inputId: string = UniqueIdGenerator.scopedTo('kirby-input').next();

  @Input() searchFunction: (searchTerm: string) => unknown[] = (
    searchTerm: string
  ): unknown[] => [];

  protected searchItems: unknown[] = [];
  private _items: unknown[] = [];

  get items(): unknown[] {
    return this._items;
  }

  @Input()
  public set items(value: unknown[]) {
    this._items = value;
    this.searchItems = this._items;
    this._value = undefined;
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
      this._value = this._selectedItem;
    }
  }

  // _focusedIndex keeps track of which element has focus and will be selected
  // if it is activated (by pressing ENTER)
  private _focusedItem: unknown = undefined;
  get focusedItem(): unknown {
    return this._focusedItem;
  }

  @Input()
  public set focusedItem(item: unknown) {
    if (this._focusedItem !== item) {
      this._focusedItem = item;
      this.scrollItemIntoView(this._focusedItem);
    }
  }

  @Input()
  public itemTextProperty: string = 'text';

  // @Input()
  // public itemIdProperty!: string; // required and verified in _ensureComponents()

  @Input()
  public placeholder = 'Please search...';

  @Input()
  set popout(direction: HorizontalDirection | `${HorizontalDirection}`) {
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
  get _isDisabled(): 'disabled' | null {
    return this.disabled ? 'disabled' : null;
  }

  @Output() hasErrorChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _hasError: boolean = false;
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
  public size: InputSize = InputSize.medium;

  // Tabindex defaults to 0 instead of no value to align tabbing behavior in Safari
  // with other browsers and the default select behavior: https://mayank.co/blog/safari-focus/
  @Input()
  public tabindex = 0;

  private get _tabindex(): number {
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

  private _value: unknown = undefined;
  public get value(): unknown {
    return this._value;
  }

  protected get selectedText(): string {
    return this.getTextFromItem(this.value) ?? '';
  }

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

  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  public itemTemplate?: TemplateRef<unknown>;

  @ContentChildren(ListItemTemplateDirective, { read: ElementRef })
  public slottedItems?: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(CardComponent, { read: ElementRef })
  public cardElement?: ElementRef<HTMLElement>;

  @ViewChild(PopoverComponent)
  public popover?: PopoverComponent;

  @ViewChild(FormFieldComponent, { static: true, read: ElementRef })
  public formFieldElement!: ElementRef<HTMLElement>;

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

    // Setup a click listener for each new slotted items
    kirbyItems.forEach((kirbyItem) => {
      this.renderer.setAttribute(kirbyItem.nativeElement, 'role', 'option');
      const disposeClickListener: EventListenerDisposeFn = this.renderer.listen(
        kirbyItem.nativeElement,
        'click',
        () => {
          this.onItemSelect(kirbyItem);
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

    this.clicked = true;

    this.toggle();
  }

  private toggle(): void {
    if (this.disabled) {
      return;
    }
    this.isOpen ? this.close() : this.open();
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
      // ensures that the dropdown is opened in case the IntersectionObserverCallback isn't invoked
      setTimeout(() => this.showDropdown(), MultiSelectAutocomplete.OPEN_DELAY_IN_MS);

      // Move focus to selected item (if any) or first item
      this.focusedItem = this.selectedItem;
    }
  }

  private showDropdown() {
    if (this.state === OpenState.opening) {
      this.state = OpenState.open;
      this.popover?.show();
      this.scrollItemIntoView(this.focusedItem);
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

  protected onItemSelect(item: unknown) {
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
  writeValue(value: unknown): void {
    this.selectItemByValue(value);
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
    }
  }

  private selectItemByValue(item: unknown): void {
    this.selectedItem = this.findDataItem(item);
  }

  public getTextFromItem(item: unknown): string | undefined {
    if (typeof item === 'string') {
      return item;
    }
    if (item && typeof item === 'object' && this.itemTextProperty in item) {
      return (item as Record<string, unknown>)[this.itemTextProperty] as string;
    }
    return undefined;
  }

  // private getIdFromItem(item: unknown): string | undefined {
  //   if (typeof item === 'string') {
  //     return item;
  //   }
  //   if (item && typeof item === 'object' && this.itemIdProperty in item) {
  //     return (item as Record<string, unknown>)[this.itemIdProperty] as string;
  //   }
  //   return undefined;
  // }

  public scrollItemIntoView(item: unknown): void {
    const kirbyItems: QueryList<ElementRef<HTMLElement>> | undefined =
      this.kirbyItemsSlotted && this.kirbyItemsSlotted.length
        ? this.kirbyItemsSlotted
        : this.kirbyItemsDefault;
    if (kirbyItems && kirbyItems.length) {
      const itemElement = this.findItemElement(item);
      if (itemElement) {
        itemElement.scrollIntoView({ block: 'nearest' });
      }
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

  // @HostListener('keydown', ['$event'])
  // _onKeydown(event: KeyboardEvent) {
  //   const key = event.key;
  //
  //   if (this.items.length === 0) {
  //     console.warn('[Kirby] No items found within dropdown');
  //     return;
  //   }
  //
  //   if (this.disabled) return;
  //
  //   // ALT + ArrowDown: Open dropdown
  //   if (key === 'ArrowDown' && event.altKey) {
  //     this.preventDefaultAndStopImmediatePropagation(event);
  //     if (!this.isOpen) {
  //       this.open();
  //       this.focusedIndex = this.selectedIndex > -1 ? this.selectedIndex : 0;
  //     }
  //     return;
  //   }
  //
  //   // ALT + ArrowUp: Select focused item and close dropdown
  //   if (key === 'ArrowUp' && event.altKey) {
  //     this.preventDefaultAndStopImmediatePropagation(event);
  //     if (this.focusedIndex > -1) {
  //       this.selectItem(this.focusedIndex);
  //       this.close();
  //     }
  //   }
  //   // PageUp: Jump up 10 options or to first
  //   if (key === 'PageUp') {
  //     this.preventDefaultAndStopImmediatePropagation(event);
  //     if (!this.isOpen) {
  //       this.open();
  //     }
  //     this.focusedIndex = Math.max(0, this.focusedIndex - 10);
  //     return;
  //   }
  //
  //   // PageDown: Jump down 10 options or to last
  //   if (key === 'PageDown') {
  //     this.preventDefaultAndStopImmediatePropagation(event);
  //     if (!this.isOpen) {
  //       this.open();
  //     }
  //     this.focusedIndex = Math.min(this.items.length - 1, this.focusedIndex + 10);
  //     return;
  //   }
  //
  //   console.log('Unhandled key:', key);
  // }

  public onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchItems = input.value ? this.searchFunction(input.value) : this.items;
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

  public onPopoverWillHide() {
    this.state = OpenState.closed;
    this.formFieldElement.nativeElement.focus();
    this.onTouched();
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

  @HostListener('keydown.enter')
  @HostListener('keydown.escape')
  public onEnterOrEscape() {
    this.close();
  }

  public onPopoverClick() {
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

  // @HostListener('keydown.arrowup', ['$event'])
  // @HostListener('keydown.arrowdown', ['$event'])
  // @HostListener('keydown.arrowleft', ['$event'])
  // @HostListener('keydown.arrowright', ['$event'])
  // _onArrowKeys(event: Event) {
  //   if (this.disabled) return false;
  //
  //   const keyEvent = event as KeyboardEvent; // safe in this context
  //   // Mirror default HTML5 select behaviour - prevent left/right arrows when open:
  //   if (this.isOpen && (keyEvent.key === 'ArrowLeft' || keyEvent.key === 'ArrowRight')) {
  //     return false;
  //   }
  //
  //   if (!this.isOpen) {
  //     // Avoid page scroll
  //     event.preventDefault();
  //     this.open();
  //
  //     // If no selected item then focus first or last item
  //     if (!keyEvent.altKey && this.selectedItem) {
  //       switch (keyEvent.key) {
  //         case 'ArrowUp':
  //           this.focusedItem = 0;
  //           break;
  //         case 'ArrowDown':
  //           this.focusedItem = this.items.length - 1;
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //     return false;
  //   }
  //
  //   const newFocusedIndex = this.keyboardHandlerService.handle(
  //     keyEvent,
  //     this.focusedItem,
  //     this.items.length - 1
  //   );
  //   if (newFocusedIndex > -1) {
  //     this.focusedItem = newFocusedIndex;
  //   }
  //   return false;
  // }

  // @HostListener('keydown.home', ['$event'])
  // @HostListener('keydown.end', ['$event'])
  // _onHomeEndKeys(event: Event) {
  //   if (this.disabled) return;
  //   if (!this.isOpen) {
  //     event.preventDefault();
  //     this.open();
  //   }
  //
  //   const keyEvent = event as KeyboardEvent; // safe in this context
  //   const newFocusedIndex = this.keyboardHandlerService.handle(
  //     keyEvent,
  //     this.focusedItem,
  //     this.items.length - 1
  //   );
  //   if (newFocusedIndex > -1) {
  //     this.focusedItem = newFocusedIndex;
  //   }
  //   return false;
  // }

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
  private findDataItem(item: unknown): unknown {
    if (!this.items || this.items.length === 0) {
      return item;
    }

    const itemText = this.getTextFromItem(item);
    if (!itemText) {
      return item;
    }

    return this.items.find((it) => this.getTextFromItem(it) === itemText) ?? item;
  }

  /** Find the rendered element for a given item (used for scrolling). */
  private findItemElement(item: unknown): HTMLElement | undefined {
    const kirbyItems =
      this.kirbyItemsSlotted && this.kirbyItemsSlotted.length
        ? this.kirbyItemsSlotted
        : this.kirbyItemsDefault;

    if (!kirbyItems || kirbyItems.length === 0) {
      return undefined;
    }

    const itemText = this.getTextFromItem(item);
    if (!itemText) {
      return undefined;
    }

    const kirbyItem = kirbyItems.toArray().find((elementRef: ElementRef<HTMLElement>) => {
      // Slotted items are ElementRefs; default template items are data items
      // so we compare by their text representation.
      return this.getTextFromItem(elementRef as unknown) === itemText;
    });

    return kirbyItem ? kirbyItem.nativeElement : undefined;
  }
}
