import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  Optional,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

export type ActionGroupConfig = {
  isResizable?: boolean;
  isCondensed?: boolean;
  visibleActions?: number;
};
export const ACTIONGROUP_CONFIG = new InjectionToken<ActionGroupConfig>('action-group.config');

@Component({
  selector: 'kirby-action-group',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DropdownModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-group.component.html',
  styleUrls: ['./action-group.component.scss'],
})
export class ActionGroupComponent implements AfterContentInit {
  @Input() visibleActions?: number;

  @Input() emphasizeActions?: boolean;

  @HostBinding('class')
  @Input()
  placement: 'left' | 'right' = 'right';

  @ContentChildren(ButtonComponent, { read: ElementRef }) private buttonElements?: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ContentChildren(ButtonComponent) private buttons?: QueryList<ButtonComponent>;
  @ViewChild('hiddenLayer', { read: ElementRef, static: true })
  private hiddenLayer!: ElementRef<HTMLElement>;
  /*
   * TEMPORARY MORE-MENU
   * dropdown ViewChild is only used for temporary more-menu
   */
  @ViewChild(DropdownComponent) private dropdown!: DropdownComponent;

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: string[] = [];

  @HostBinding('class.is-resizeable')
  _isResizeable = false;

  private _nonCollapsibleVisibleActions: number = 2;

  private hiddenButtons: HTMLButtonElement[];

  constructor(
    private renderer: Renderer2,
    @Optional() @Inject(ACTIONGROUP_CONFIG) private config: ActionGroupConfig
  ) {}

  ngAfterContentInit(): void {
    if (this.config) {
      this._isResizeable = this.config.isResizable;
      this.visibleActions = this.config.visibleActions;
      if (this.config.isCondensed) {
        this.buttons?.forEach((button) => (button.showIconOnly = true));
      }
    }

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
    const hasHiddenButtons = this.hiddenLayer.nativeElement.childElementCount > 0;
    this._isCollapsed = hasHiddenButtons;
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
