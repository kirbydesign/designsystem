import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'kirby-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent implements AfterContentInit {
  @Input() iconName: string;
  @Input() customIconName: string;
  @Input() title: string;
  @Input() subtitle: string;

  @ContentChildren(ButtonComponent)
  private slottedButtons: QueryList<ButtonComponent>;

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
      if (index === 0 && button.isAttentionLevel1) return;

      if (!button.isAttentionLevel3) {
        button.attentionLevel = '3';
      }
    });
  }
}
