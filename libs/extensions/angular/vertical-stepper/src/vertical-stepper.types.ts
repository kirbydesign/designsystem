/**
 * A single step in a {@link VerticalStepperComponent}.
 */
export interface VerticalStepperStep {
  /**
   * The title of the step.
   */
  title: string;

  /**
   * An optional description shown below the title.
   */
  description?: string;
}
