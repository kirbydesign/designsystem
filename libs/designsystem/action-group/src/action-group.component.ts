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

  @HostBinding('class.is-collapsed')
  _isCollapsed: boolean;
  _collapsedActions: CollapsedAction[] = [];

  @HostBinding('class')
  get _align() {
    return 'align-' + this.align;
  }

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    @Optional() @Inject(ACTIONGROUP_CONFIG) private readonly config: ActionGroupConfig
  ) {}

  ngAfterContentInit(): void {
    this.initializeFromConfig();

    if (this.visibleActions !== undefined) {
      this.applyVisibility();
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
        this.applyVisibility();
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

  private applyVisibility(): void {
    if (!this.buttonElements) return;

    const visibleActions = this.visibleActions ?? this.buttonElements.length;

    this._collapsedActions = [];
    this.buttonElements.forEach((button, index) => {
      if (index < visibleActions) {
        this.renderer.removeStyle(button.nativeElement, 'display');
      } else {
        this.renderer.setStyle(button.nativeElement, 'display', 'none');
        this._collapsedActions.push({
          button: button.nativeElement,
          text: button.nativeElement.textContent.trim(),
        });
      }
    });

    this._isCollapsed = this._collapsedActions.length > 0;
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

    this.applyVisibility();
    this.cdr.markForCheck();
  }
}
