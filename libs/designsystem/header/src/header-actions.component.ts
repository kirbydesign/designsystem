import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { last } from 'rxjs';

@Component({
  selector: 'kirby-header-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
})
export class HeaderActionsComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  /*
   * When the consumer sets the visibleActions input, we run all our initialization logic.
   * The guard for this.buttons exist because when the component is instantiated,
   * the ContentChild query has not yet run, and all the below functions assume that
   * the buttons array is defined. When undefined, we defer the initialization to ngAfterViewInit().
   */
  @Input() set visibleActions(value: number) {
    this._visibleActions = value;
    this.visibleButtonIntersectionObserver?.disconnect();

    if (!this.buttons) return;
    this.initializeCollapsing();
  }

  @Input() emphasizeActions?: boolean;

  @HostBinding('class')
  @Input()
  placement: 'left' | 'right' = 'left';

  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef<HTMLElement>;
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef<HTMLButtonElement>[];
  @ContentChildren(ButtonComponent) private buttonComps: QueryList<ButtonComponent>;
  @ViewChild('hiddenLayer', { read: ElementRef }) hiddenLayer!: ElementRef<HTMLElement>;
  @ViewChild('visibleLayer', { read: ElementRef }) visibleLayer!: ElementRef<HTMLElement>;
  private dropdownButton!: HTMLButtonElement;

  //   @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: string[] = [];
  _visibleActions: number;

  /*
   * TEMPORARY MORE-MENU
   * dropdownComp ViewChild is only used for temporary more-menu
   */
  @ViewChild(DropdownComponent) dropdownComp!: DropdownComponent;

  private hiddenButtons: HTMLButtonElement[];
  private visibleButtonIntersectionObserver: IntersectionObserver;
  private dropdownButtonIntersectionObserver: IntersectionObserver;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private resizeObserverService: ResizeObserverService
  ) {}

  private _hostElementIsVisible: Promise<void>;
  private whenHostElementIsVisible() {
    if (!this._hostElementIsVisible) {
      this._hostElementIsVisible = new Promise((resolve) => {
        this.resizeObserverService.observe(this.elementRef, (entry) => {
          if (entry.contentRect.width > 0) {
            this.resizeObserverService.unobserve(this.elementRef);
            resolve();
          }
        });
      });
    }
    return this._hostElementIsVisible;
  }

  ngAfterContentInit(): void {
    const isInToolbar = this.elementRef.nativeElement.closest('ion-toolbar');
    //  if (isInToolbar) {
    //    this.isCondensed = true;
    //    this.visibleActions = 2;
    //  } else {
    //    const emphasizeActions = !!this.elementRef.nativeElement.closest('.actions.emphasize');
    //    if (this.visibleActions === undefined && !emphasizeActions) {
    //      // Setting default visible actions to 2:
    //      this.visibleActions = 2;
    //    }
    //  }
  }

  public set isCondensed(value: boolean) {
    this.buttonComps.forEach((button) => (button.showIconOnly = value));
  }

  ngAfterViewInit(): void {
    if (this._visibleActions) {
      this.initializeCollapsing();
    } else {
      this.whenHostElementIsVisible().then(() => this.initializeDynamicResizing());
    }
  }

  ngOnDestroy(): void {
    this.visibleButtonIntersectionObserver?.disconnect();
  }

  onDropdownActionSelect() {
    const selectedIndex = this.dropdownComp.selectedIndex;
    const selectedAction = this.hiddenButtons[selectedIndex];

    // Dropdown should not persist selected item, we want it to be re-selectable
    this.dropdownComp.selectedIndex = -1;

    if (selectedAction) {
      const event = new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      selectedAction.dispatchEvent(event);
    }
  }

  private initializeCollapsing() {
    if (this.buttons.length <= 2) return;
    this.moveButtons();
    this.populateDropdown();
    this.toggleDropdown();
  }

  private moveButtons() {
    this.buttons.forEach((button, index) => {
      if (index > this._visibleActions - 1) {
        this.renderer.appendChild(this.hiddenLayer.nativeElement, button.nativeElement);
      } else {
        this.renderer.appendChild(this.visibleLayer.nativeElement, button.nativeElement);
      }
    });
  }

  private toggleDropdown() {
    if (this.hiddenLayer.nativeElement.childElementCount === 0) {
      this._isCollapsed = false;
    } else {
      this._isCollapsed = true;
    }
  }

  private populateDropdown() {
    /*
     * This function maps extracts the button text of all hidden buttons
     * and updates the array used to populate the dropdown with items.
     * It also maps the extracted text to the actual button element, for use when
     * firing the matching buttons click-event in onDropdownActionSelect
     */

    this._collapsedActions = [];
    this.hiddenButtons = Array.from(this.hiddenLayer.nativeElement.children) as HTMLButtonElement[];

    this.hiddenButtons.forEach((button) => {
      const buttonText = button.textContent.trim();
      this._collapsedActions.unshift(buttonText);
    });
  }

  private initializeDynamicResizing() {
    this.visibleButtonIntersectionObserver = new IntersectionObserver(
      this.handleVisibleButtonIntersection,
      {
        root: this.elementRef.nativeElement,
        threshold: 1.0, // we only move buttons when they cross from fully visible to not (partly or fully hidden)
      }
    );
    this.dropdownButtonIntersectionObserver = new IntersectionObserver(
      this.handleDropdownButtonIntersection,
      {
        root: this.elementRef.nativeElement,
        threshold: [0.0, 1.0], // we only need to react when the dropdown is partly or fully hidden
      }
    );

    this.buttons.forEach((button) => {
      this.visibleButtonIntersectionObserver.observe(button.nativeElement);
    });

    this.dropdownButton = this.dropdown.nativeElement.querySelector('button[kirby-button]');
    this.dropdownButtonIntersectionObserver.observe(this.dropdownButton);
  }

  private handleDropdownButtonIntersection: IntersectionObserverCallback = (entries) => {
    console.warn('--- handleDropdownButtonIntersection ---');
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log(`(dropdown observer) --- LOOP --- entry: ${this._debugEntryState(entry)}`);

      // console.log('visibleButtonIntersection - ', entry);
      const entryPartlyVisible = entry.intersectionRatio > 0 && entry.intersectionRatio < 1;
      if (entryPartlyVisible) {
        setTimeout(() => {
          console.log('(dropdown observer) dropdownButton partly outside - hide button before...');
          const buttonBefore = this.dropdown.nativeElement.previousElementSibling;
          this.visibleButtonIntersectionObserver.unobserve(buttonBefore);
          this.renderer.appendChild(this.hiddenLayer.nativeElement, buttonBefore);
          this.visibleButtonIntersectionObserver.observe(buttonBefore);
          // this.toggleDropdown();
          this.populateDropdown();
        }, this._debugTimeoutInterval * 2);
      }
    });
  };

  //  console.log('dropdown button:', entry);

  private moveVisibleButtonToHiddenLayer(entry: IntersectionObserverEntry) {
    let buttonToMove = entry.target;
    if (this.placement === 'right') {
      const visibleButtons = this.elementRef.nativeElement.querySelectorAll(
        ':scope > button[kirby-button]'
      );
      const lastVisibleButton = visibleButtons[visibleButtons.length - 1];
      buttonToMove = lastVisibleButton;
    }
    console.log(
      `[buttons observer] button ${this._debugEntryState(entry)} is partly visible  => move${
        buttonToMove === entry.target ? '' : ' [' + buttonToMove.textContent.trim() + ']'
      } to hidden layer...`
    );

    //  this.visibleButtonIntersectionObserver.unobserve(buttonToMove);

    // If this is the first button to hide:
    if (this.hiddenLayer.nativeElement.childElementCount === 0) {
      // To prevent an inifite loop we need to remove the element, show the "more" menu,
      // and then move the button to the hidden layer:
      setTimeout(() => {
        console.log(
          `[buttons observer] remove button [${buttonToMove.textContent}] from visible layer...`
        );
        this.renderer.removeChild(this.elementRef.nativeElement, buttonToMove);
      }, this._debugTimeoutInterval * 1);
      setTimeout(() => {
        console.log('[buttons observer] set collapsed...');
        this.renderer.addClass(this.elementRef.nativeElement, 'is-collapsed');
      }, this._debugTimeoutInterval * 2);
    }

    setTimeout(() => {
      console.log(
        `[buttons observer] NOW actually move button [${buttonToMove.textContent}] to hidden layer...`
      );
      this.renderer.appendChild(this.hiddenLayer.nativeElement, buttonToMove);
      // this.visibleButtonIntersectionObserver.observe(buttonToMove);
      this.populateDropdown();
    }, this._debugTimeoutInterval * 3);
  }

  private moveHiddenButtonToVisibleLayer(entry: IntersectionObserverEntry) {
    console.log(
      `[buttons observer] hidden button ${this._debugEntryState(
        entry
      )} can fit => move to visible layer... `
    );

    // renderer2.insertBefore triggers the intersectionObserver callback,
    // so pause observing and resume after move:
    this.visibleButtonIntersectionObserver.unobserve(entry.target);

    // if this is the last hidden button, hide the "more" menu:
    if (this.hiddenLayer.nativeElement.childElementCount === 1) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'is-collapsed');
    }

    // move hidden button to visible layer:
    this.renderer.insertBefore(
      this.elementRef.nativeElement,
      entry.target,
      this.dropdown.nativeElement
    );

    // resume observing after move:
    this.visibleButtonIntersectionObserver.observe(entry.target);
    //  this.toggleDropdown();
    this.populateDropdown();
  }

  private _debugTimeoutInterval = 1000;
  private _debugEntryState(entry: IntersectionObserverEntry) {
    return `[${entry.target.textContent.trim() || 'dropdown'}] (visible: ${Math.round(
      entry.intersectionRatio * 100
    )}%)`;
  }

  private handleVisibleButtonIntersection: IntersectionObserverCallback = (entries) => {
    console.warn('--- handleVisibleButtonIntersection ---');
    // const nativeButtons: Element[] = this.buttons.map((buttonRef) => buttonRef.nativeElement);
    // const sortedEntries = entries.sort((a, b) =>
    //   nativeButtons.indexOf(a.target) > nativeButtons.indexOf(b.target) ? 1 : -1
    // );
    // console.warn('--- entries:\n', entries.map((entry) => entry.target.textContent).join(','));
    // console.warn(
    //   '--- sortedEntries:\n',
    //   sortedEntries.map((entry) => entry.target.textContent).join(',')
    // );

    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log(`(buttons observer) --- LOOP --- entry: ${this._debugEntryState(entry)}`);
      // console.log('indexOf entry:', nativeButtons.indexOf(entry.target));

      const entryPartlyVisible =
        entry.intersectionRatio < 1 && !entry.target.closest('.hidden-layer');
      if (entryPartlyVisible) {
        this.moveVisibleButtonToHiddenLayer(entry);
      }
      const hiddenEntryCanFitInVisibleLayer =
        entry.intersectionRatio === 1 && entry.target.closest('.hidden-layer');
      if (hiddenEntryCanFitInVisibleLayer) {
        this.moveHiddenButtonToVisibleLayer(entry);
      }
    });
  };
}
