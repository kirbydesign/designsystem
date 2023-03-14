import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

@Component({
  selector: 'kirby-action-group',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DropdownModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-group.component.html',
  styleUrls: ['./action-group.component.scss'],
})
export class ActionGroupComponent implements AfterContentInit, AfterViewInit {
  @Input() visibleActions: number;

  @Input() emphasizeActions?: boolean;

  @HostBinding('class')
  @Input()
  placement: 'left' | 'right' = 'right';

  @ContentChildren(ButtonComponent, { read: ElementRef }) private buttonElements!: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ContentChildren(ButtonComponent) private buttons: QueryList<ButtonComponent>;
  @ViewChild('hiddenLayer', { read: ElementRef }) private hiddenLayer!: ElementRef<HTMLElement>;
  /*
   * TEMPORARY MORE-MENU
   * dropdown ViewChild is only used for temporary more-menu
   */
  @ViewChild(DropdownComponent) private dropdown!: DropdownComponent;

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: string[] = [];

  private _nonCollapsibleVisibleActions: number = 2;

  private hiddenButtons: HTMLButtonElement[];

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    const isInToolbar = this.elementRef.nativeElement.closest('ion-toolbar');
    const emphasizeActions = !!this.elementRef.nativeElement.closest('.actions.emphasize');
    if (isInToolbar || emphasizeActions === false) {
      // Setting default visible actions to 1:
      this.visibleActions = 1;
    }
    if (isInToolbar) {
      this.isCondensed = true;
      this.placement = 'right';
    }
  }

  public set isCondensed(value: boolean) {
    this.buttons.forEach((button) => (button.showIconOnly = value));
  }

  ngAfterViewInit(): void {
    if (this.visibleActions) {
      this.initializeCollapsing();
    }
  }

  onDropdownActionSelect() {
    const selectedIndex = this.dropdown.selectedIndex;
    const selectedAction = this.hiddenButtons[selectedIndex];

    // Dropdown should not persist selected item, we want it to be re-selectable
    this.dropdown.selectedIndex = -1;

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
    if (this.buttonElements.length <= this._nonCollapsibleVisibleActions) return;
    this.moveButtons();
    this.populateDropdown();
    this.toggleDropdown();
  }

  private moveButtons() {
    const buttonsToHide = [...this.buttonElements].slice(this.visibleActions);
    buttonsToHide.forEach((button) => {
      this.renderer.appendChild(this.hiddenLayer.nativeElement, button.nativeElement);
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
     * This function extracts the button text of all hidden buttons
     * and updates the array used to populate the dropdown with items.
     * It also maps the extracted text to the actual button element, for use when
     * firing the matching buttons click-event in onDropdownActionSelect
     */

    this.hiddenButtons = Array.from(this.hiddenLayer.nativeElement.children) as HTMLButtonElement[];
    this._collapsedActions = this.hiddenButtons.map((button) => button.textContent.trim());
  }
}
