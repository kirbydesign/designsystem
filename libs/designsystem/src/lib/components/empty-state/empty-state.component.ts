import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'kirby-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements AfterContentInit {
  @Input() iconName: string;
  @Input() customIconName: string;
  @Input() title: string;
  @Input() subtitle: string;

  @ContentChildren(ButtonComponent)
  private slottedButtons: QueryList<ButtonComponent>;

  private ngUnsubscribe$ = new Subject<void>();

  ngAfterContentInit() {
    this.enforceAttentionLevelRules();

    this.slottedButtons.changes.pipe(delay(0)).subscribe(() => this.enforceAttentionLevelRules());
  }

  /** Enforces that all buttons will have their attention
   * level set to 3 except the first encountered button
   * with level 1
   */
  private enforceAttentionLevelRules() {
    let encounteredLvl1Button = false;

    this.slottedButtons.forEach((button) => {
      if (button.isAttentionLevel1 && !encounteredLvl1Button) {
        encounteredLvl1Button = true;
      } else if (!button.isAttentionLevel3) {
        button.attentionLevel = '3';
      }
    });
  }
}
