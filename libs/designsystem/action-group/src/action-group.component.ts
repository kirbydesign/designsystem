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
  OnChanges,
  Optional,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { MenuComponent } from '@kirbydesign/designsystem/menu';

export type ActionGroupConfig = {
  isCondensed?: boolean;
  defaultVisibleActions?: number;
  maxVisibleActions?: number;
};
export const ACTIONGROUP_CONFIG = new InjectionToken<ActionGroupConfig>('action-group.config');

type CollapsedAction = { button: HTMLButtonElement; text: string };

@Component({
  selector: 'kirby-action-group',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ItemModule, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-group.component.html',
  styleUrls: ['./action-group.component.scss'],
})
export class ActionGroupComponent implements AfterContentInit, OnChanges {
  @Input() visibleActions?: number;

  @Input()
  align: 'start' | 'end' = 'end';

  @ContentChildren(ButtonComponent, { read: ElementRef }) private buttonElements?: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ContentChildren(ButtonComponent) private buttons?: QueryList<ButtonComponent>;
  @ViewChild('hiddenLayer', { read: ElementRef, static: true })
  private hiddenLayer!: ElementRef<HTMLElement>;

  @ViewChild(MenuComponent, { read: ElementRef, static: true })
  private menuElement!: ElementRef<HTMLElement>;

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: CollapsedAction[] = [];

  @HostBinding('class')
  get _align() {
    return 'align-' + this.align;
  }

  private collapseThreshold = 2;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Optional() @Inject(ACTIONGROUP_CONFIG) private config: ActionGroupConfig
  ) {}

  ngAfterContentInit(): void {
    // Ensure we collapse according to visibleActions if lower than our default threshold (2).
    // I.e. if there are 2 buttons and visibleActions = 1 we'll collapse the 2nd button into the menu:
    if (this.visibleActions < this.collapseThreshold) {
      this.collapseThreshold = this.visibleActions;
    }

    this.initializeFromConfig();

    if (this.visibleActions !== undefined) {
      this.initializeCollapsing();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visibleActions && !changes.visibleActions.firstChange) {
      const satifiesMaxVisibleActions =
        this.config?.maxVisibleActions === undefined ||
        this.config?.maxVisibleActions === null ||
        changes.visibleActions.currentValue <= this.config?.maxVisibleActions;
      if (satifiesMaxVisibleActions) {
        this.initializeCollapsing();
      }
    }
  }

  onActionSelect(action: CollapsedAction) {
    const event = new PointerEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    action.button.dispatchEvent(event);
  }

  private initializeFromConfig() {
    if (!this.config) return;

    if (this.visibleActions === undefined && this.config.defaultVisibleActions !== undefined) {
      this.visibleActions = this.config.defaultVisibleActions;
    }

    if (this.config.maxVisibleActions !== undefined) {
      // Don't overwrite visibleActions value if configured lower than maxVisibleActions:
      if (!(this.visibleActions < this.config.maxVisibleActions)) {
        this.visibleActions = this.config.maxVisibleActions;
      }
    }

    if (this.config.isCondensed) {
      this.buttons?.forEach((button) => (button.showIconOnly = true));
    }
  }

  private initializeCollapsing() {
    if (this.buttonElements.length <= this.collapseThreshold) return;

    this.moveButtons();
    this.populateMenu();
    this.toggleMenu();
  }

  private moveButtons() {
    const buttonsToShow = [...this.buttonElements]
      .slice(0, this.visibleActions)
      .filter((btn) => btn.nativeElement.parentElement === this.hiddenLayer.nativeElement);
    buttonsToShow.forEach((button) => {
      this.renderer.insertBefore(
        this.elementRef.nativeElement,
        button.nativeElement,
        this.menuElement.nativeElement
      );
    });

    const buttonsToHide = [...this.buttonElements].slice(this.visibleActions);
    buttonsToHide.forEach((button) => {
      this.renderer.appendChild(this.hiddenLayer.nativeElement, button.nativeElement);
    });
  }

  private toggleMenu() {
    const hasHiddenButtons = this.hiddenLayer.nativeElement.childElementCount > 0;
    this._isCollapsed = hasHiddenButtons;
  }

  private populateMenu() {
    const hiddenButtons = Array.from(
      this.hiddenLayer.nativeElement.children
    ) as HTMLButtonElement[];

    this._collapsedActions = hiddenButtons.map((button) => ({
      button,
      text: button.textContent.trim(),
    }));
  }
}
