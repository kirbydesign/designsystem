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
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-menu',
  imports: [ButtonComponent, CommonModule, FloatingDirective, IconModule, CardModule, ItemModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  readonly menuId: string = UniqueIdGenerator.scopedTo('kirby-menu').next();
  triggerButtonId: string = UniqueIdGenerator.scopedTo('kirby-menu-trigger-button').next();

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
  private floatingMenu: FloatingDirective;

  @ContentChildren(ItemComponent, { read: ElementRef }) public kirbyItems: QueryList<
    ElementRef<HTMLElement>
  >;

  @ContentChildren(ItemComponent) public kirbyItemComponents: QueryList<ItemComponent>;

  public floatingMenuIsShown: boolean = false;
  public FloatingOffset: typeof FloatingOffset = FloatingOffset;
  private scrollListenerDisposeFn: EventListenerDisposeFn;
  private focusedIndex = -1;

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent) {
    if (this.kirbyItems.length === 0) {
      console.warn('[Kirby] No items found within menu');
      return;
    }
    if (this.floatingMenuIsShown) {
      this.handleKeyDownForOpenedMenu(event);
    } else {
      this.handleKeyDownForClosedMenu(event);
    }
  }

  private preventDefaultAndStopImmediatePropagation(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private getFirstInteractiveElement(el: HTMLIonItemElement) {
    return el.querySelector<HTMLIonToggleElement | HTMLIonRadioElement | HTMLIonCheckboxElement>(
      'ion-toggle:not([disabled]), ion-checkbox:not([disabled]), ion-radio:not([disabled])'
    );
  }

  private handleKeyDownForClosedMenu(event: KeyboardEvent) {
    const key = event.key;
    switch (key) {
      case ' ':
      case 'Enter':
      case 'ArrowDown':
        this.preventDefaultAndStopImmediatePropagation(event);
        this.focusedIndex = 0;
        this.floatingMenu.show();
        this.focusItem();
        break;
      case 'ArrowUp':
        this.preventDefaultAndStopImmediatePropagation(event);
        this.focusedIndex = this.kirbyItems.length - 1;
        this.floatingMenu.show();
        this.focusItem();
        break;
    }
  }

  private isPrintableCharacter(key: string) {
    return key.length === 1 && key.match(/\S/);
  }

  private handleKeyDownForOpenedMenu(event: KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case 'ArrowDown':
        this.preventDefaultAndStopImmediatePropagation(event);
        if (this.focusedIndex === this.kirbyItems.length - 1) {
          this.focusedIndex = 0;
        } else {
          this.focusedIndex++;
        }
        this.focusItem();
        break;
      case 'ArrowUp':
        this.preventDefaultAndStopImmediatePropagation(event);
        if (this.focusedIndex === 0) {
          this.focusedIndex = this.kirbyItems.length - 1;
        } else {
          this.focusedIndex--;
        }
        this.focusItem();
        break;
      case 'Home': {
        this.preventDefaultAndStopImmediatePropagation(event);
        if (this.focusedIndex > 0) {
          this.focusedIndex = 0;
          this.focusItem();
        }
        break;
      }
      case 'End': {
        this.preventDefaultAndStopImmediatePropagation(event);
        if (this.focusedIndex < this.kirbyItems.length - 1) {
          this.focusedIndex = this.kirbyItems.length - 1;
          this.focusItem();
        }
        break;
      }
      case 'Escape':
        this.preventDefaultAndStopImmediatePropagation(event);
        if (this.closeOnEscapeKey) {
          this.floatingMenu.hide();
        }
        break;
      case 'Tab':
        this.floatingMenu.hide();
        break;
      default: {
        if (this.isPrintableCharacter(key)) {
          this.preventDefaultAndStopImmediatePropagation(event);
          const foundItemIndex = this.getIndexOfItemByFirstCharacter(key);
          if (foundItemIndex > -1) {
            this.focusedIndex = foundItemIndex;
            this.focusItem();
          }
        }
      }
    }
  }

  private getIndexOfItemByFirstCharacter(char: string) {
    return this.getIndexByFirstMatchingStartString(
      char,
      this.kirbyItems.map((item) => item.nativeElement.innerText),
      this.focusedIndex + 1
    );
  }

  private getIndexByFirstMatchingStartString(
    searchString: string,
    words: string[],
    startIndex: number
  ): number {
    searchString = searchString.toLowerCase();

    const wordsStartingWithMatchString = words
      .map((word, index) => {
        return { word: word.toLowerCase(), index };
      })
      .filter((match) => match.word.startsWith(searchString));

    if (wordsStartingWithMatchString.length === 0) {
      return -1;
    }

    const firstWordStartingWithChar = wordsStartingWithMatchString[0];
    const nextWordStartingWithChar = wordsStartingWithMatchString.find(
      (wordAndIndex) => wordAndIndex.index >= startIndex
    );

    return nextWordStartingWithChar?.index ?? firstWordStartingWithChar.index;
  }

  focusItem() {
    const itemToBeFocused = this.kirbyItems.get(this.focusedIndex);
    const ionItem = itemToBeFocused.nativeElement.querySelector('ion-item');

    // Look for interactive element within ion-item like toggle or checkbox and set focus if found
    const firstInteractiveElementWithinItem = this.getFirstInteractiveElement(ionItem);
    if (typeof firstInteractiveElementWithinItem?.['setFocus'] === 'function') {
      firstInteractiveElementWithinItem['setFocus']();
    } else {
      this.focusSelectableItem(ionItem);
    }
  }

  private focusSelectableItem(ionItem: HTMLIonItemElement) {
    const nativeButton: HTMLButtonElement =
      ionItem.shadowRoot.querySelector('button:not([disabled])');
    nativeButton?.focus();
  }

  getTriggerButton(): HTMLButtonElement {
    return (this.userProvidedButton ?? this.defaultButtonElement).nativeElement;
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Sets the updated reference for kirby-floating

    this.zone.runOutsideAngular(() => {
      /*
       * Listen for ionScroll outside of Angular's change detection to
       * avoid a change detection cycle for every scroll-event fired
       */
      this.scrollListenerDisposeFn = this.renderer.listen(document, 'ionScroll', () => {
        this.floatingMenu.hide();
      });
    });
  }

  ngAfterContentInit(): void {
    this.setRoleAttributeForAllItems();
    this.setUserProvidedButtonAriaAttributes();
    this.ensureSelectableOnItems();
  }

  ensureSelectableOnItems() {
    this.kirbyItemComponents.forEach((itemComponent) => {
      if (itemComponent.selectable === undefined) {
        itemComponent.selectable = true;
      }
    });
  }

  private setRoleAttributeForAllItems() {
    this.kirbyItems.forEach((item) => {
      this.setRoleAttributeForItem(item.nativeElement);
    });
  }

  private setRoleAttributeForItem(item: HTMLElement) {
    let menuItemRole = 'menuitem';
    if (item.matches(':has(kirby-toggle, kirby-checkbox)')) {
      menuItemRole = 'menuitemcheckbox';
    } else if (item.matches(':has(kirby-radio)')) {
      menuItemRole = 'menuitemradio';
    }
    this.renderer.setAttribute(item, 'role', menuItemRole);
  }

  menuVisibilityChanged(menuIsShown: boolean) {
    this.floatingMenuIsShown = menuIsShown;
    this.renderer.setAttribute(this.getTriggerButton(), 'aria-expanded', menuIsShown.toString());
    if (!menuIsShown) {
      this.focusedIndex = -1;
      this.getTriggerButton().focus();
    }
  }

  private setUserProvidedButtonAriaAttributes() {
    if (!this.userProvidedButton) return;

    const button = this.userProvidedButton.nativeElement;
    if (button.id) {
      this.triggerButtonId = button.id;
    } else {
      this.renderer.setAttribute(button, 'id', this.triggerButtonId);
    }
    if (!button.getAttribute('aria-controls')) {
      this.renderer.setAttribute(button, 'aria-controls', this.menuId);
    }
    if (!button.getAttribute('aria-haspopup')) {
      this.renderer.setAttribute(button, 'aria-haspopup', 'true');
    }
  }

  ngOnDestroy(): void {
    this.scrollListenerDisposeFn?.();
  }
}
