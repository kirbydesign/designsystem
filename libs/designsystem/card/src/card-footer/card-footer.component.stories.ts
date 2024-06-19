import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent, CardFooterComponent } from '@kirbydesign/designsystem/card';

const cardContent = `<p>
  Card content.
</p>
`;

const meta: Meta<CardFooterComponent> = {
  component: CardFooterComponent,
  title: 'Components / Card / Card Footer',
  decorators: [
    moduleMetadata({
      declarations: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CardFooterComponent>;

export const CardFooter: Story = {
  args: {
    hasPadding: true,
  },
  render: (args: CardFooterComponent) => ({
    props: args,
    template: `<kirby-card>
      ${cardContent}
      <kirby-card-footer ${argsToTemplate(args)}>Footer</kirby-card-footer>
    </kirby-card>`,
  }),
};
