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
  standalone: true,
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

  public floatingMenuIsShown: boolean = false;
  public FloatingOffset: typeof FloatingOffset = FloatingOffset;
  private scrollListenerDisposeFn: EventListenerDisposeFn;
  private focusedIndex = -1;

  @HostListener('keydown', ['$event'])
  _onKeydown(event: KeyboardEvent) {
    if (this.floatingMenuIsShown) {
      this.handleKeyDownForOpenedMenu(event);
    } else {
      this.handleKeyDownForClosedMenu(event);
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

    return controls[0];
  }

  private handleKeyDownForClosedMenu(event: KeyboardEvent) {
    const key = event.key;
    switch (key) {
      case ' ':
      case 'Enter':
      case 'ArrowDown':
        this.focusedIndex = 0;
        this.floatingMenu.show();
        this.focusItem();
        this.preventFurtherPropagation(event);
        break;
      case 'ArrowUp':
        this.focusedIndex = this.kirbyItems.length - 1;
        this.floatingMenu.show();
        this.focusItem();
        this.preventFurtherPropagation(event);
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
        if (this.focusedIndex === this.kirbyItems.length - 1) {
          this.focusedIndex = 0;
        } else {
          this.focusedIndex++;
        }
        this.focusItem();
        this.preventFurtherPropagation(event);
        break;
      case 'ArrowUp':
        if (this.focusedIndex === 0) {
          this.focusedIndex = this.kirbyItems.length - 1;
        } else {
          this.focusedIndex--;
        }
        this.focusItem();
        this.preventFurtherPropagation(event);
        break;
      case 'Home': {
        if (this.focusedIndex > 0) {
          this.focusedIndex = 0;
          this.focusItem();
        }
        this.preventFurtherPropagation(event);
        break;
      }
      case 'End': {
        if (this.focusedIndex < this.kirbyItems.length - 1) {
          this.focusedIndex = this.kirbyItems.length - 1;
          this.focusItem();
        }
        this.preventFurtherPropagation(event);
        break;
      }
      case 'Escape':
        if (this.closeOnEscapeKey) {
          this.floatingMenu.hide();
        }
        this.preventFurtherPropagation(event);
        break;
      case 'Tab':
        this.floatingMenu.hide();
        break;
      default: {
        if (this.isPrintableCharacter(key)) {
          const foundItemIndex = this.getIndexByFirstCharacter(
            key,
            this.kirbyItems.map((item) => item.nativeElement.innerText)
          );
          if (foundItemIndex > -1) {
            this.focusedIndex = foundItemIndex;
            this.focusItem();
          }
          this.preventFurtherPropagation(event);
        }
      }
    }
  }

  private getIndexByFirstCharacter(char: string, words: string[]): number {
    if (char.length > 1) {
      return;
    }

    char = char.toLowerCase();
    let foundItemIndex = -1;
    let startIndex = this.focusedIndex + 1;

    if (startIndex !== words.length) {
      const spliced = words.splice(startIndex);
      foundItemIndex = spliced.findIndex((word) => word.toLowerCase().startsWith(char));
    }

    if (foundItemIndex === -1) {
      startIndex = 0;
      foundItemIndex = words.findIndex((word) => word.toLowerCase().startsWith(char));
    }
    return startIndex + foundItemIndex;
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
    this.setupAccessibilityForItems();
    this.setupAccesibilityForUserProvidedButton();
  }

  private setupAccessibilityForItems() {
    this.kirbyItems.forEach((item) => {
      this.renderer.setAttribute(item.nativeElement, 'role', 'menuitem');
    });
  }

  menuVisibilityChanged(menuIsShown: boolean) {
    this.floatingMenuIsShown = menuIsShown;
    this.renderer.setAttribute(this.getTriggerButton(), 'aria-expanded', menuIsShown.toString());
    if (!menuIsShown) {
      this.focusedIndex = -1;
      this.getTriggerButton().focus();
    }
  }

  private setupAccesibilityForUserProvidedButton() {
    if (this.userProvidedButton) {
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
  }

  ngOnDestroy(): void {
    this.scrollListenerDisposeFn?.();
  }
}
