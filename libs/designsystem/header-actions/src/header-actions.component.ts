import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
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
export class HeaderActionsComponent implements AfterViewInit {
  /*
   * When the consumer sets the visibleActions input, we run all our initialization logic.
   * The guard for this.buttons exist because when the component is instantiated,
   * the ContentChild query has not yet run, and all the below functions assume that
   * the buttons array is defined. When undefined, we defer the initialization to ngAfterViewInit().
   */
  @Input() set visibleActions(value: number) {
    this._visibleActions = value;

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

  _collapsedActions: string[] = [];
  _visibleActions: number;

  private dropdownTextToButtonMap: Map<string, HTMLButtonElement>;
  private visibleLayerObserver: IntersectionObserver;
  private visibleLayerObserverOptions;
  private observedElement: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.initializeCollapsing();
    this.observedElement = this.visibleLayer;
    this.initializeDynamicResizing();
  }

  initializeCollapsing() {
    if (this.buttons.length <= 2) return;
    this.moveButtons();
    this.populateDropdown();
    this.toggleDropdown();
  }

  moveButtons() {
    this.buttons.forEach((button, index) => {
      if (index > this._visibleActions - 1) {
        this.renderer.appendChild(this.hiddenLayer.nativeElement, button.nativeElement);
      } else {
        this.renderer.appendChild(this.visibleLayer.nativeElement, button.nativeElement);
      }
    });
  }

  toggleDropdown() {
    if (this.hiddenLayer.nativeElement.childElementCount === 0) {
      this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.dropdown.nativeElement, 'display', 'inline-block');
    }
  }

  populateDropdown() {
    /*
     * This function maps extracts the button text of all hidden buttons
     * and updates the array used to populate the dropdown with items.
     * It also maps the extracted text to the actual button element, for use when
     * firing the matching buttons click-event in onDropdownActionSelect
     */

    this.dropdownTextToButtonMap = new Map<string, HTMLButtonElement>();
    this._collapsedActions = [];

    const hiddenButtons = Array.from(
      this.hiddenLayer.nativeElement.children
    ) as HTMLButtonElement[];

    hiddenButtons.forEach((button) => {
      const buttonText = button.textContent.trim();
      this._collapsedActions.push(buttonText);
      this.dropdownTextToButtonMap.set(buttonText, button);
    });
  }

  onDropdownActionSelect(action) {
    const selectedAction = this.dropdownTextToButtonMap.get(action);
    if (selectedAction) {
      const event = new PointerEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      selectedAction.dispatchEvent(event);
    }
  }

  initializeDynamicResizing() {
    this.visibleLayerObserverOptions = {
      root: this.elementRef.nativeElement,
      threshold: 1.0,
    };

    this.visibleLayerObserver = new IntersectionObserver(
      this.handleVisibleLayerIntersection,
      this.visibleLayerObserverOptions
    );

    this.visibleLayerObserver.observe(this.observedElement.nativeElement);
  }

  private handleVisibleLayerIntersection = (entries) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      console.log(entry);

      if (entry.isIntersecting) {
        return;
      }
      const buttons = this.visibleLayer.nativeElement.querySelectorAll('button');

      if (buttons.length > 0) {
        this.hideNextButton(buttons);
      }
    });
  };

  private hideNextButton(buttons: NodeListOf<HTMLButtonElement>) {
    const nextVisibleButton = buttons[buttons.length - 1];
    this.hiddenLayer.nativeElement.appendChild(nextVisibleButton);
    this.toggleDropdown();
    if (this.dropdown) {
      this.observedElement = this.placement === 'left' ? this.dropdown : this.visibleLayer;
    }

    this.visibleLayerObserver.unobserve(this.observedElement.nativeElement);
    this.visibleLayerObserver.observe(this.observedElement.nativeElement);
  }
}
