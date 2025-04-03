import { Component, Input } from '@angular/core';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AnchorAsButtonDirective } from '@kirbydesign/extensions-angular/accessibility-utilities';

@Component({
  template: `
    <a anchorAsButton (click)="onClick()">Click me</a>
  `,
  selector: 'extensions-anchor-as-button-example',
  standalone: true,
  imports: [AnchorAsButtonDirective],
})
class AnchorAsButtonExampleComponent {
  /**
   * Handles the click event.
   */
  @Input() onClick = () => alert('Link clicked!');
}

/**
 * Allows an `<a>` element to behave like a button.
 *
 * - Sets `role="button"` and `tabindex="0"` to make it accessible.
 * - Listens for `Enter` key presses to trigger a click event.
 * - Applies cursor and text-decoration styles for visual consistency.
 */
const meta: Meta<AnchorAsButtonExampleComponent> = {
  component: AnchorAsButtonExampleComponent,
  title: 'Directives/Accessibility/AnchorAsButton',
  decorators: [
    moduleMetadata({
      imports: [AnchorAsButtonDirective],
    }),
  ],
  tags: ['!autodocs', 'dev'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<AnchorAsButtonExampleComponent>;

export const Anchor_As_Button: Story = {
  args: {
    onClick: () => alert('Link clicked!'),
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `<a anchorAsButton (click)="onClick()">Click me</a>`,
      },
    },
  },
};
