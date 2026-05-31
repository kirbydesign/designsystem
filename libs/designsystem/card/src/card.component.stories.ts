import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { CardAsButtonDirective, CardComponent } from '@kirbydesign/designsystem/card';
import { CardExampleComponent } from '~/app/examples/card-example/card-example.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Components / Card',
  decorators: [
    moduleMetadata({
      imports: [CardAsButtonDirective, CardComponent, CardExampleComponent],
    }),
  ],
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

export const Focused: Story = {
  render: () => ({
    template: `
      <kirby-card [hasPadding]="true" (click)="noop()">
        Clickable card with focus ring
      </kirby-card>
    `,
    props: {
      noop: () => {
        // noop
      },
    },
  }),
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('kirby-card');
    if (card) {
      (card as HTMLElement).focus();
    }
  },
};
