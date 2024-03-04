import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent } from '../card.component';
import { CardFooterComponent } from './card-footer.component';

const cardContent = `<p>
  Card content.
</p>
`;

const meta: Meta<CardFooterComponent> = {
  component: CardFooterComponent,
  title: 'CardFooterComponent',
  decorators: [
    moduleMetadata({
      declarations: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CardFooterComponent>;

export const Default: Story = {
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
