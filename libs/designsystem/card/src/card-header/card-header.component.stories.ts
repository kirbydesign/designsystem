import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CardComponent } from '../card.component';
import { CardHeaderComponent } from './card-header.component';

const cardContent = `<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>
`;

const meta: Meta<CardHeaderComponent> = {
  component: CardHeaderComponent,
  title: 'CardHeaderComponent',
  decorators: [
    moduleMetadata({
      imports: [IconModule],
      declarations: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CardHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Title',
    subtitle: '',
    isTitleBold: false,
    flagged: null,
    hasPadding: true,
  },
  argTypes: {
    flagged: {
      options: ['success', 'warning', 'danger', 'info'],
      control: { type: 'radio' },
    },
  },
};

export const FlaggedInCard: Story = {
  render: () => ({
    template: ` 
      <kirby-card>
        <kirby-card-header [title]="'Flagged - Success'" flagged="success"></kirby-card-header>
        ${cardContent}
      </kirby-card>

      <kirby-card>
        <kirby-card-header [title]="'Flagged - Warning'" flagged="warning"></kirby-card-header>
        ${cardContent}
      </kirby-card>

      <kirby-card>
        <kirby-card-header [title]="'Flagged - Danger'" flagged="danger"></kirby-card-header>
        ${cardContent}
      </kirby-card>

      <kirby-card>
        <kirby-card-header [title]="'Flagged - Info'" flagged="info"></kirby-card-header>
        ${cardContent}
      </kirby-card>
    `,
  }),
};
