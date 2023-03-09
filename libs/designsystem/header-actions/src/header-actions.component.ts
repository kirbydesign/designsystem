import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

@Component({
  selector: 'kirby-header-actions',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DropdownModule],
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
})
export class HeaderActionsComponent implements AfterViewInit, OnDestroy {
  /*
   * When the consumer sets the visibleActions input, we run all our initialization logic.
   * The guard for this.buttons exist because when the component is instantiated,
   * the ContentChild query has not yet run, and all the below functions assume that
   * the buttons array is defined. When undefined, we defer the initialization to ngAfterViewInit().
   */
  @Input() set visibleActions(value: number) {
    this._visibleActions = value;
    this.hiddenButtonsIntersectionObserver?.disconnect();

    if (!this.buttons) return;
    this.initializeCollapsing();
  }

  @HostBinding('class')
  @Input()
  placement: 'left' | 'right' = 'left';

  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef;
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef<HTMLButtonElement>[];
  @ViewChild('hiddenLayer', { read: ElementRef }) hiddenLayer!: ElementRef<HTMLElement>;
  @ViewChild('visibleLayer', { read: ElementRef }) visibleLayer!: ElementRef<HTMLElement>;

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean = true;
  _collapsedActions: string[] = [];
  _visibleActions: number;

  /*
   * TEMPORARY MORE-MENU
   * dropdownComp ViewChild is only used for temporary more-menu
   */
  @ViewChild(DropdownComponent) dropdownComp!: DropdownComponent;

  private hiddenButtons: HTMLButtonElement[];
  private hiddenButtonsIntersectionObserver: IntersectionObserver;
  private intersectionObserverOptions;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this._visibleActions) {
      this.initializeCollapsing();
    } else {
      this.initializeDynamicResizing();
    }
  }

  ngOnDestroy(): void {
    this.hiddenButtonsIntersectionObserver?.disconnect();
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
      this._collapsedActions.push(buttonText);
    });
  }

  private initializeDynamicResizing() {
    this.intersectionObserverOptions = {
      root: this.visibleLayer.nativeElement,
      threshold: 1.0,
    };

    this.hiddenButtonsIntersectionObserver = new IntersectionObserver(
      this.handleHiddenButtonIntersection,
      this.intersectionObserverOptions
    );

    this.buttons.forEach((button) => {
      this.hiddenButtonsIntersectionObserver.observe(button.nativeElement);
    });
  }

  private handleHiddenButtonIntersection = (entries) => {
    const buttonsToHide: Element[] = [];
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.intersectionRatio < 1) {
        buttonsToHide.push(entry.target);
      }

      // if (entry.isIntersecting) {
      //   if (entry.intersectionRatio === 1) {
      //     if (entry.target.parentElement === this.hiddenLayer.nativeElement) {
      //       console.log('Intersecting btn: ', entry.target);
      //     }
      //   }
      // }
    });

    //console.log(buttonsToHide);

    this.hideButtons(buttonsToHide);
    this.populateDropdown();
  };

  private hideButtons(buttons: Element[]) {
    buttons.forEach((button) => {
      this.renderer.appendChild(this.hiddenLayer.nativeElement, button);
    });

    this.toggleDropdown();
  }

  private showButton(button: Element) {
    this.renderer.appendChild(this.visibleLayer.nativeElement, button);
  }
}
