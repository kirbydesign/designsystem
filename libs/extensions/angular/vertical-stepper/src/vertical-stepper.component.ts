import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TranslationService } from '@kirbydesign/designsystem/shared';
import { VerticalStepperStep } from './vertical-stepper.types';

interface VerticalStepperStepWithState extends VerticalStepperStep {
  completed: boolean;
  active: boolean;
}

/**
 * Displays a vertical list of steps, indicating progress through a sequential flow.
 */
@Component({
  selector: 'kirby-x-vertical-stepper',
  imports: [IconComponent],
  templateUrl: './vertical-stepper.component.html',
  styleUrl: './vertical-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperComponent {
  /**
   * The steps to display, in the order they should be completed.
   */
  readonly steps = input.required<VerticalStepperStep[]>();

  /**
   * The index of the step currently in progress. Steps before this index are marked as completed,
   * and steps after are marked as pending.
   */
  readonly activeIndex = input(0);

  protected readonly stepStates = computed<VerticalStepperStepWithState[]>(() =>
    this.steps().map((step, index) => ({
      ...step,
      completed: index < this.activeIndex(),
      active: index === this.activeIndex(),
    }))
  );

  constructor(private translations: TranslationService) {}

  protected statusLabel(step: VerticalStepperStepWithState): string {
    if (step.completed) {
      return this.translations.get('stepCompleted');
    }
    if (step.active) {
      return this.translations.get('stepInProgress');
    }
    return this.translations.get('stepPending');
  }
}
