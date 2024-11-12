import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'kirby-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent implements AfterContentInit, OnInit {
  private _title: string;

  @Input() iconName: string;

  @Input() set title(value: string) {
    this._title = value;
    this.setAriaLabelOnModal();
  }

  get title(): string {
    return this._title;
  }

  @Input() subtitle: string;

  @ContentChildren(ButtonComponent)
  private slottedButtons: QueryList<ButtonComponent>;
  private ionModalElement: HTMLIonModalElement;
  private modalElementDialog: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    /* If initialized inside a modal that is not labelled, we want to set
     * the aria-label attribute on ion-modal to the title of empty state.
     * Further updates are handled by title setter.
     */
    this.ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    this.modalElementDialog = this.ionModalElement?.shadowRoot.querySelector('[role="dialog"]');
    this.setAriaLabelOnModal();
  }

  ngAfterContentInit() {
    this.enforceAttentionLevelRules();

    /* setTimeout prevents ExpressionChangedAfterItHasBeenCheckedError when changing attention 
    levels of slotted buttons in this.enforceAttentionLevelRules */
    this.slottedButtons.changes.subscribe(() => {
      setTimeout(() => this.enforceAttentionLevelRules());
    });
  }

  private setAriaLabelOnModal() {
    if (this.modalElementDialog && this._title) {
      this.modalElementDialog.ariaLabel = this._title;
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
