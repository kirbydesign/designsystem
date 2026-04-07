import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
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

import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AttentionLevel, ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';
import {
  FloatingDirective,
  FloatingOffset,
  PortalOutletConfig,
  TriggerEvent,
} from '@kirbydesign/designsystem/shared/floating';
import { EventListenerDisposeFn } from '@kirbydesign/designsystem/types';
import { StringSearchHelper, UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { forwardAttributes, TranslationService } from '@kirbydesign/designsystem/shared';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kirby-menu',
  imports: [ButtonComponent, FloatingDirective, CardComponent, IconComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  readonly menuId: string = UniqueIdGenerator.scopedTo('kirby-menu').next();
  triggerButtonId: string = UniqueIdGenerator.scopedTo('kirby-menu-trigger-button').next();
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone,
    private renderer: Renderer2,
    public translations: TranslationService,
    private destroyRef: DestroyRef
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
  private disposeIonScrollListener: EventListenerDisposeFn;
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

  @HostListener('click')
  _onClick() {
    if (!this.floatingMenuIsShown) return;
    this.focusedIndex = 0;
    this.focusItem();
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
        if (StringSearchHelper.isPrintableCharacter(key)) {
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
    return StringSearchHelper.getIndexByFirstMatchingStartString(
      char,
      this.kirbyItems.map((item) => item.nativeElement.innerText),
      this.focusedIndex + 1
    );
  }

  focusItem() {
    const itemToBeFocused = this.kirbyItems.get(this.focusedIndex);
    const ionItem = itemToBeFocused.nativeElement.querySelector('ion-item');

    // Look for interactive element within ion-item like toggle or checkbox and set focus if found
    const firstInteractiveElementWithinItem = this.getFirstInteractiveElement(ionItem);
    if (firstInteractiveElementWithinItem) {
      firstInteractiveElementWithinItem.focus();
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
      this.disposeIonScrollListener = this.renderer.listen(document, 'ionScroll', () => {
        this.floatingMenu.hide();
      });
    });
    this.forwardAriaLabelToTriggerButton();
  }

  ngAfterContentInit(): void {
    this.setUserProvidedButtonAriaAttributes();
    this.kirbyItemComponents.changes
      .pipe(startWith(null), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.setRoleAttributeForAllItems();
        this.ensureSelectableItems();
      });
  }

  private forwardAriaLabelToTriggerButton() {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.getTriggerButton()
    );
  }

  ensureSelectableItems() {
    this.kirbyItemComponents.forEach((itemComponent) => {
      if (itemComponent.selectable === undefined) {
        itemComponent.selectable = true;
      }
    });
  }

  private setRoleAttributeForAllItems() {
    this.kirbyItems.forEach((item) => {
      this.setRoleOnNativeControl(item.nativeElement);
    });
  }

  private async setRoleOnNativeControl(item: HTMLElement) {
    const ionItem = item.querySelector<HTMLIonItemElement>('ion-item');
    if (!ionItem) return;

    // Wait for ion-item to be hydrated before accessing Shadow DOM
    await new Promise<void>((resolve) => {
      componentOnReady(ionItem, () => resolve());
    });

    // Pierce Shadow DOM and set role/aria-label directly on the native button/input
    // This is needed for VoiceOver compatibility in Safari mobile
    if (item.matches(':has(kirby-toggle, kirby-checkbox)')) {
      const nativeInput = ionItem
        ?.querySelector('ion-toggle, ion-checkbox')
        ?.shadowRoot?.querySelector('input');

      if (nativeInput) {
        this.renderer.setAttribute(nativeInput, 'role', 'menuitemcheckbox');
        return;
      }
    } else {
      const nativeButton = ionItem.shadowRoot?.querySelector('button');
      if (nativeButton) {
        nativeButton.setAttribute('role', 'menuitem');
      }
    }
  }

  menuVisibilityChanged(menuIsShown: boolean) {
    this.floatingMenuIsShown = menuIsShown;
    this.renderer.setAttribute(this.getTriggerButton(), 'aria-expanded', menuIsShown.toString());
    if (!menuIsShown) {
      this.focusedIndex = -1;
      this.getTriggerButton().focus();
      return;
    }

    if (this.focusedIndex === -1) {
      this.focusedIndex = 0;
    }

    this.focusFirstItemAfterRender();
  }

  private focusFirstItemAfterRender() {
    requestAnimationFrame(() => {
      if (this.kirbyItems.length > 0) {
        this.focusItem();
      }
    });
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
    if (!button.getAttribute('aria-label')) {
      this.renderer.setAttribute(button, 'aria-label', this.translations.get('more'));
    }
  }

  ngOnDestroy(): void {
    this.disposeIonScrollListener?.();
  }
}
