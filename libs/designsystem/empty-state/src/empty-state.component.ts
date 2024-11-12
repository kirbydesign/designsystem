import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'kirby-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent implements AfterContentInit {
  _title: string;

  @Input() iconName: string;

  @Input() set title(value: string) {
    this._title = value;
    this.setAccessibleModalLabel();
  }

  get title(): string {
    return this._title;
  }

  @Input() subtitle: string;

  @ContentChildren(ButtonComponent)
  private slottedButtons: QueryList<ButtonComponent>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit() {
    this.enforceAttentionLevelRules();

    /* setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError when changing attention 
    levels of slotted buttons in this.enforceAttentionLevelRules */
    this.slottedButtons.changes.subscribe(() => {
      setTimeout(() => this.enforceAttentionLevelRules());
    });
  }

  setAccessibleModalLabel() {
    /* If we are inside a modal that is not labelled, we want to set 
    the aria-label attribute on ion-modal to point to the title of empty state */
    const ionModalDialog = this.elementRef.nativeElement
      .closest('ion-modal')
      .shadowRoot.querySelector('[role="dialog"]');

    ionModalDialog.ariaLabel ?? (ionModalDialog.ariaLabel = this.title);
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
