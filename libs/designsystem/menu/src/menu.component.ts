import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Placement } from '@floating-ui/dom';

import { ItemComponent, ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { AttentionLevel, ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';
import {
  FloatingDirective,
  FloatingOffset,
  PortalOutletConfig,
  TriggerEvent,
} from '@kirbydesign/designsystem/shared/floating';
import { EventListenerDisposeFn } from '@kirbydesign/designsystem/types';

@Component({
  selector: 'kirby-menu',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FloatingDirective, IconModule, CardModule, ItemModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  readonly MENU_ID: string = 'MENU_ID';
  triggerButtonId: string = 'DEFAULT_BUTTON';

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  @Input() public isDisabled: boolean = false;

  @Input() public buttonSize: ButtonSize = ButtonSize.MD;

  @Input() public placement: Placement = 'bottom-start';

  @Input() public attentionLevel: AttentionLevel = '3';

  @Input() public triggers: Array<TriggerEvent> = ['click'];

  @Input() public DOMPortalOutlet: HTMLElement = this.elementRef.nativeElement.ownerDocument.body;

  @Input() public portalOutletConfig: PortalOutletConfig | undefined;

  @Input() public autoPlacement: boolean = false;

  @Input() public closeOnSelect: boolean = true;

  @Input() public closeOnEscapeKey: boolean = true;

  @Input() public closeOnBackdrop: boolean = true;

  @Input() public shift: boolean = true;

  /**
   * The minimum width of the menu. If not set, the default width is 240px
   */
  @Input() public minWidth: number;

  @ViewChild('buttonContainer', { read: ElementRef })
  public buttonContainerElement: ElementRef<HTMLElement> | undefined;

  @ViewChild('defaultButton', { read: ElementRef })
  public defaultButtonElement: ElementRef<HTMLButtonElement> | undefined;

  @ContentChild(ButtonComponent, { read: ElementRef }) public userProvidedButton:
    | ElementRef<HTMLButtonElement>
    | undefined;

  @ViewChild(FloatingDirective)
  _floatingMenu: FloatingDirective;

  @ContentChildren(ItemComponent, { read: ElementRef }) public kirbyItems: QueryList<
    ElementRef<HTMLElement>
  >;

  public floatingMenuIsShown: boolean = false;
  public FloatingOffset: typeof FloatingOffset = FloatingOffset;
  private scrollListenerDisposeFn: EventListenerDisposeFn;
  private focusedIndex = -1;

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent) {
    if (this.floatingMenuIsShown) {
      this.handleOnKeyForOpenedMenu(event);
    } else {
      this.handleOnKeyForClosedMenu(event);
    }
  }

  private preventFurtherPropagation(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private getFirstInteractiveElement(el: HTMLIonItemElement) {
    const controls = el.querySelectorAll<
      HTMLIonToggleElement | HTMLIonRadioElement | HTMLIonCheckboxElement
    >('ion-toggle:not([disabled]), ion-checkbox:not([disabled]), ion-radio:not([disabled])');

    return controls[0] || undefined;
  }

  private handleOnKeyForClosedMenu(event: KeyboardEvent) {
    const key = event.key;
    switch (key) {
      case ' ':
      case 'Enter':
      case 'ArrowDown':
      case 'Down':
        this.focusedIndex = 0;
        this._floatingMenu.show();
        this.focusItem();
        this.preventFurtherPropagation(event);
        break;
      case 'Up':
      case 'ArrowUp':
        this.focusedIndex = this.kirbyItems.length - 1;
        this._floatingMenu.show();
        this.focusItem();
        this.preventFurtherPropagation(event);
        break;
    }
  }

  private handleOnKeyForOpenedMenu(event: KeyboardEvent) {
    const key = event.key;
    switch (key) {
      case 'ArrowDown':
        if (this.focusedIndex < this.kirbyItems.length - 1) {
          this.focusedIndex++;
          this.focusItem();
          this.preventFurtherPropagation(event);
        }
        break;
      case 'ArrowUp':
        if (this.focusedIndex > 0) {
          this.focusedIndex--;
          this.focusItem();
          this.preventFurtherPropagation(event);
        }
        break;
      case 'Escape':
        if (this.closeOnEscapeKey) {
          this._floatingMenu.hide();
        }
        this.preventFurtherPropagation(event);
        break;
      case 'Tab':
        this._floatingMenu.hide();
        break;
    }
  }

  private focusTriggerButton() {
    this.getTriggerButton().nativeElement.focus();
  }

  resetFocus() {
    this.focusedIndex = -1;
  }

  focusItem() {
    const itemToBeFocused = this.kirbyItems.get(this.focusedIndex);
    const ionItem = itemToBeFocused.nativeElement.querySelector('ion-item');

    // Look for interactive element within ion-item like toggle or checkbox and set focus if found
    const firstInteractiveElementWithinItem = this.getFirstInteractiveElement(ionItem);
    if (firstInteractiveElementWithinItem) {
      firstInteractiveElementWithinItem['setFocus']();
    } else {
      this.focusSelectableItem(ionItem);
    }
  }

  private focusSelectableItem(ionItem: HTMLIonItemElement) {
    const selectableItem: HTMLButtonElement =
      ionItem.shadowRoot.querySelector('button:not([disabled])');
    if (selectableItem) {
      selectableItem.focus();
    }
  }

  getTriggerButton(): ElementRef<HTMLButtonElement> {
    return this.userProvidedButton ?? this.defaultButtonElement;
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Sets the updated reference for kirby-floating

    this.zone.runOutsideAngular(() => {
      /*
       * Listen for ionScroll outside of Angular's change detection to
       * avoid a change detection cycle for every scroll-event fired
       */
      this.scrollListenerDisposeFn = this.renderer.listen(document, 'ionScroll', () => {
        this._floatingMenu.hide();
      });
    });
  }

  ngAfterContentInit(): void {
    this.setupAccessibilityForItems();
    this.setupAccesibilityForUserProvidedButton();
  }

  private setupAccessibilityForItems() {
    this.kirbyItems.forEach((item) => {
      item.nativeElement.setAttribute('role', 'menuitem');
    });
  }

  menuVisibilityChanged(menuIsShown: boolean) {
    this.floatingMenuIsShown = menuIsShown;
    this.getTriggerButton().nativeElement.setAttribute('aria-expanded', menuIsShown + '');
    if (!menuIsShown) {
      this.resetFocus();
      this.focusTriggerButton();
    }
  }

  private setupAccesibilityForUserProvidedButton() {
    if (this.userProvidedButton) {
      const element = this.userProvidedButton.nativeElement;

      this.setupAriaHasPopup(element);
      this.setupAriaControls(element);
      this.setupId(element);
    }
  }

  private setupId(button: HTMLButtonElement) {
    if (!button.id) {
      button.id = 'userProvidedButton';
    }
    this.triggerButtonId = button.id;
  }

  private setupAriaControls(button: HTMLButtonElement) {
    if (!button.getAttribute('aria-controls')) {
      button.setAttribute('aria-controls', this.MENU_ID);
    }
  }

  private setupAriaHasPopup(button: HTMLButtonElement) {
    if (!button.getAttribute('aria-haspopup')) {
      button.setAttribute('aria-haspopup', 'true');
    }
  }

  ngOnDestroy(): void {
    this.scrollListenerDisposeFn?.();
  }
}
