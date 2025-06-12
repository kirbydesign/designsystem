import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { LinkComponent } from '@kirbydesign/designsystem/link';

import { LinkExampleButtonComponent } from '~/app/examples/link-example/examples/button';

const meta: Meta<LinkComponent> = {
  component: LinkComponent,
  title: 'Components / Link',
  decorators: [
    moduleMetadata({
      imports: [LinkExampleButtonComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<LinkComponent>;

export const Link: Story = {
  render: () => ({
    template: `<cookbook-link-example-button></cookbook-link-example-button>`,
  }),
};
