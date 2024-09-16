import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent, CardModule } from '@kirbydesign/designsystem/card';

import { responsiveModes } from 'tools/storybook-config/shared-config';
import { CardExampleModule } from '~/app/examples/card-example/card-example.module';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Components / Card',
  decorators: [
    moduleMetadata({
      imports: [CardModule, CardExampleModule],
    }),
  ],
  parameters: {
    chromatic: {
      modes: {
        ...responsiveModes,
      },
    },
  },
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    title: '',
    subtitle: '',
    backgroundImageUrl: '',
    hasPadding: false,
    variant: 'elevated',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-card ${argsToTemplate(args)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </kirby-card>`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-card-example></cookbook-card-example>`,
  }),
};
