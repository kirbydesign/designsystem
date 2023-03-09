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
    this.visibleButtonItersectionObserver?.disconnect();

    if (!this.buttons) return;
    this.initializeCollapsing();
  }

  @HostBinding('class')
  @Input()
  placement: 'left' | 'right' = 'left';

  @ViewChild(DropdownComponent, { read: ElementRef }) dropdown!: ElementRef<HTMLElement>;
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttons!: ElementRef<HTMLButtonElement>[];
  @ViewChild('hiddenLayer', { read: ElementRef }) hiddenLayer!: ElementRef<HTMLElement>;
  @ViewChild('visibleLayer', { read: ElementRef }) visibleLayer!: ElementRef<HTMLElement>;
  private dropdownButton!: HTMLButtonElement;

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: string[] = [];
  _visibleActions: number;

  /*
   * TEMPORARY MORE-MENU
   * dropdownComp ViewChild is only used for temporary more-menu
   */
  @ViewChild(DropdownComponent) dropdownComp!: DropdownComponent;

  private hiddenButtons: HTMLButtonElement[];
  private visibleButtonItersectionObserver: IntersectionObserver;

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this._visibleActions) {
      this.initializeCollapsing();
    } else {
      this.initializeDynamicResizing();
    }
    console.log(this.buttons);
  }

  ngOnDestroy(): void {
    this.visibleButtonItersectionObserver?.disconnect();
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
    const intersectionObserverOptions = {
      root: this.elementRef.nativeElement,
      threshold: 1.0,
    };

    this.visibleButtonItersectionObserver = new IntersectionObserver(
      this.handleVisibleButtonIntersection,
      intersectionObserverOptions
    );

    this.buttons.forEach((button) => {
      this.visibleButtonItersectionObserver.observe(button.nativeElement);
    });

    this.dropdownButton = this.dropdown.nativeElement.querySelector('button[kirby-button]');
    this.visibleButtonItersectionObserver.observe(this.dropdownButton);
  }

  private handleVisibleButtonIntersection = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // console.log('visibleButtonIntersection - ', entry);
      if (entry.intersectionRatio < 1 && !entry.target.closest('.hidden-layer')) {
        console.log('visibleButtonIntersection - partly out of bounds', entry.target.textContent);
        if (entry.target !== this.dropdownButton) {
          if (this.placement === 'right') {
            const visibleButtons = this.elementRef.nativeElement.querySelectorAll(
              ':scope > button[kirby-button]'
            );
            // console.log('visibleButtons:', visibleButtons);
            // const lastVisibleButton = this.elementRef.nativeElement.querySelector(
            //   ':scope > button[kirby-button]:first-child'
            // );
            // console.log('lastVisibleButton:', lastVisibleButton);
            const lastVisibleButton = visibleButtons[visibleButtons.length - 1];
            // this.visibleButtonItersectionObserver.unobserve(entry.target);
            console.log(`Move [${lastVisibleButton.textContent}] to hidden layer...`);

            this.visibleButtonItersectionObserver.unobserve(lastVisibleButton);
            this.renderer.appendChild(this.hiddenLayer.nativeElement, lastVisibleButton);
            setTimeout(() => {
              console.log(`Startt observing [${lastVisibleButton.textContent}]...`);

              // this.visibleButtonItersectionObserver.observe(entry.target);
              this.visibleButtonItersectionObserver.observe(lastVisibleButton);
            });
            this.toggleDropdown();
            this.populateDropdown();
          } else {
            // PLACEMENT LEFT:

            this.renderer.appendChild(this.hiddenLayer.nativeElement, entry.target);
            this.toggleDropdown();
            this.populateDropdown();
          }
        } else {
          if (entry.intersectionRatio !== 0) {
            console.log('dropdownButton partly outside - move button before');

            const buttonBefore = this.dropdown.nativeElement.previousElementSibling;
            this.renderer.appendChild(this.hiddenLayer.nativeElement, buttonBefore);
            this.toggleDropdown();
            this.populateDropdown();
          }
        }
      }
      if (entry.intersectionRatio === 1 && entry.target.closest('.hidden-layer')) {
        console.log(
          `visibleButtonIntersection - entry ${entry.target.textContent} is in hidden layer => move out... `
        );
        // this.renderer.appendChild(this.elementRef.nativeElement, entry.target);
        this.visibleButtonItersectionObserver.unobserve(entry.target);
        this.renderer.insertBefore(
          this.elementRef.nativeElement,
          entry.target,
          this.dropdown.nativeElement
        );
        setTimeout(() => {
          this.visibleButtonItersectionObserver.observe(entry.target);
        });
        this.toggleDropdown();
        this.populateDropdown();
      }
    });
  };
}
