import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardFooterComponent, CardModule } from '@kirbydesign/designsystem/card';

const cardContent = `<p>
  Card content.
</p>
`;

const meta: Meta<CardFooterComponent> = {
  component: CardFooterComponent,
  title: 'Components / Card / Card Footer',
  decorators: [
    moduleMetadata({
      imports: [CardModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<CardFooterComponent>;

export const CardFooter: Story = {
  args: {
    hasPadding: true,
  },
  render: (args) => ({
    props: args,
    template: `<kirby-card>
      ${cardContent}
      <kirby-card-footer ${argsToTemplate(args)}>Footer</kirby-card-footer>
    </kirby-card>`,
  }),
};
