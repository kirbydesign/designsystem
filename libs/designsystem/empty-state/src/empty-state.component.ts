import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent implements AfterContentInit, AfterViewInit {
  @Input() iconName: string;
  @Input() title: string;
  @Input() subtitle: string;

  @ContentChildren(ButtonComponent)
  private slottedButtons: QueryList<ButtonComponent>;

  _titleId = UniqueIdGenerator.scopedTo('kirby-modal-title').next();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit() {
    this.enforceAttentionLevelRules();

    /* setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError when changing attention 
    levels of slotted buttons in this.enforceAttentionLevelRules */
    this.slottedButtons.changes.subscribe(() => {
      setTimeout(() => this.enforceAttentionLevelRules());
    });
  }

  ngAfterViewInit(): void {
    /* If we are inside a modal that is not labelled by e.g. a title, we want to set 
    aria-labelledby attribute on ion-modal to point to the title of empty state */
    const ionModal = this.elementRef.nativeElement.closest('ion-modal');
    const ionModalNotLabelled = !ionModal?.getAttribute('aria-labelledby');
    if (ionModal && ionModalNotLabelled) {
      ionModal.setAttribute('aria-labelledby', this._titleId);
    }
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
