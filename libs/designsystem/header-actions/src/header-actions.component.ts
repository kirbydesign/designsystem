import {
  AfterViewInit,
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
  imports: [CommonModule, DropdownModule],
  templateUrl: './header-actions.component.html',
  styleUrls: ['./header-actions.component.scss'],
})
export class HeaderActionsComponent implements AfterViewInit {
  /*
   * When the consumer sets the visibleActions input, we run all our initialization logic.
   * The guard for this.buttons exist because when the component is instantiated the first
   * time, the ContentChild query has not yet run, and all the below functions assume that
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
  _visibleActions: number = 1;

  private dropdownTextToButtonMap;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initializeCollapsing();
  }

  initializeCollapsing() {
    this.moveButtons();
    this.populateDropdown();
    this.toggleDropdown();
  }

  moveButtons() {
    this.buttons.forEach((button, index) => {
      if (index > this._visibleActions - 1) {
        this.hiddenLayer.nativeElement.appendChild(button.nativeElement);
      } else {
        this.visibleLayer.nativeElement.appendChild(button.nativeElement);
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
}
