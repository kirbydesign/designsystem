import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { getIonModalDialogAncestor } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EmptyStateComponent implements AfterContentInit, OnInit {
  private _title: string;
  private ionModalDialog: HTMLElement;

  @Input() iconName: string;

  @Input() set title(value: string) {
    this._title = value;

    if (this.ionModalDialog) {
      this.renderer.setAttribute(this.ionModalDialog, 'aria-label', value);
    }
  }

  get title(): string {
    return this._title;
  }

  @Input() subtitle: string;

  @ContentChildren(ButtonComponent)
  private slottedButtons: QueryList<ButtonComponent>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    /* If initialized inside a modal we want to set
     * the aria-label attribute on ion-modal to the title of empty state.
     * Further updates are handled by title setter.
     */
    this.ionModalDialog = getIonModalDialogAncestor(this.elementRef.nativeElement);
    if (this.ionModalDialog) {
      this.renderer.setAttribute(this.ionModalDialog, 'aria-label', this.title);
    }
  }

  ngAfterContentInit() {
    this.enforceAttentionLevelRules();

    /* setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError when changing attention 
    levels of slotted buttons in this.enforceAttentionLevelRules */
    this.slottedButtons.changes.subscribe(() => {
      setTimeout(() => this.enforceAttentionLevelRules());
    });
  }

  /** Enforces that all slotted buttons will have their attention
   * level set to 3, except the first button if it has
   * level 1.
   */
  private enforceAttentionLevelRules() {
    this.slottedButtons.forEach((button, index) => {
      if (index === 0 && (button.attentionLevel === undefined || button.attentionLevel === '1')) {
        return;
      }

      if (button.attentionLevel !== '3') {
        button.attentionLevel = '3';
      }
    });
  }
}
