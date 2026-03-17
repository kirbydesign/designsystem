import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ItemComponent } from '@kirbydesign/designsystem/item';
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
  imports: [ItemComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-group.component.html',
  styleUrls: ['./action-group.component.scss'],
})
export class ActionGroupComponent implements AfterContentInit, OnChanges {
  @Input() visibleActions?: number;

  @Input()
  align: 'start' | 'end' = 'end';

  @ContentChildren(ButtonComponent, { read: ElementRef })
  private readonly buttonElements?: QueryList<ElementRef<HTMLButtonElement>>;
  @ContentChildren(ButtonComponent) private readonly buttons?: QueryList<ButtonComponent>;
  @ViewChild('hiddenLayer', { read: ElementRef, static: true })
  private readonly hiddenLayer!: ElementRef<HTMLElement>;

  @ViewChild(MenuComponent, { read: ElementRef, static: true })
  private readonly menuElement!: ElementRef<HTMLElement>;

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: CollapsedAction[] = [];

  @HostBinding('class')
  get _align() {
    return 'align-' + this.align;
  }

  private collapseThreshold = 2;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    @Optional() @Inject(ACTIONGROUP_CONFIG) private readonly config: ActionGroupConfig
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

    this.subscribeToProjectedButtonChanges();
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
      view: globalThis.window,
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
      if (
        this.visibleActions === undefined ||
        this.visibleActions >= this.config.maxVisibleActions
      ) {
        this.visibleActions = this.config.maxVisibleActions;
      }
    }

    if (this.config.isCondensed) {
      this.buttons?.forEach((button) => (button.showIconOnly = true));
    }
  }

  private initializeCollapsing() {
    if (!this.buttonElements) return;

    if (this.buttonElements.length > this.collapseThreshold) {
      this.moveVisibleButtonsBeforeMenu();
      this.moveOverflowButtonsToHiddenLayer();
    } else {
      this.moveHiddenButtonsBeforeMenu();
    }

    this.refreshCollapsedState();
  }

  private moveVisibleButtonsBeforeMenu(): void {
    const buttonsToShow = this.getButtonsToShow();

    buttonsToShow.forEach((button) => {
      this.renderer.insertBefore(
        this.elementRef.nativeElement,
        button.nativeElement,
        this.menuElement.nativeElement
      );
    });
  }

  private moveOverflowButtonsToHiddenLayer(): void {
    const buttonsToHide = this.getButtonsToHide();

    buttonsToHide.forEach((button) => {
      this.renderer.appendChild(this.hiddenLayer.nativeElement, button.nativeElement);
    });
  }

  private moveHiddenButtonsBeforeMenu(): void {
    this.getHiddenButtons().forEach((button) => {
      this.renderer.insertBefore(
        this.elementRef.nativeElement,
        button,
        this.menuElement.nativeElement
      );
    });
  }

  private getButtonsToShow(): Array<ElementRef<HTMLButtonElement>> {
    const visibleActions = this.visibleActions ?? 0;

    return [...this.buttonElements]
      .slice(0, visibleActions)
      .filter((button) => button.nativeElement.parentElement === this.hiddenLayer.nativeElement);
  }

  private getButtonsToHide(): Array<ElementRef<HTMLButtonElement>> {
    const visibleActions = this.visibleActions ?? 0;
    return [...this.buttonElements].slice(visibleActions);
  }

  private getHiddenButtons(): HTMLButtonElement[] {
    return Array.from(this.hiddenLayer.nativeElement.children) as HTMLButtonElement[];
  }

  private refreshCollapsedState(): void {
    this.populateMenu();
    this.toggleMenu();
  }

  private toggleMenu() {
    this._isCollapsed = this.hiddenLayer.nativeElement.childElementCount > 0;
  }

  private populateMenu() {
    const hiddenButtons = this.getHiddenButtons();

    this._collapsedActions = hiddenButtons.map((button) => ({
      button,
      text: button.textContent.trim(),
    }));
  }

  private subscribeToProjectedButtonChanges(): void {
    this.buttonElements?.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.onProjectedButtonsChanged());
  }

  private onProjectedButtonsChanged(): void {
    this.updateCondensedButtons();
    this.updateCollapsedButtons();
  }

  private updateCondensedButtons(): void {
    if (!this.config?.isCondensed) return;

    this.buttons?.forEach((button) => (button.showIconOnly = true));
  }

  private updateCollapsedButtons(): void {
    if (this.visibleActions === undefined) return;

    this.initializeCollapsing();
    this.cdr.markForCheck();
  }
}
