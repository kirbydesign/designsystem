import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import {
  CardAsButtonDirective,
  CardComponent,
  CardHeaderComponent,
} from '@kirbydesign/designsystem/card';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { CardExampleComponent } from '~/app/examples/card-example/card-example.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Components / Card',
  decorators: [
    moduleMetadata({
      imports: [
        CardAsButtonDirective,
        CardComponent,
        CardHeaderComponent,
        ItemComponent,
        CardExampleComponent,
      ],
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
        <kirby-card-header [hasPadding]="false">
          <kirby-item [disclosure]="'arrow-more'">
            <p class="kirby-text-normal-bold">Item disclosure in header</p>
          </kirby-item>
        </kirby-card-header>
        Clickable card with focus ring
      </kirby-card>
    `,
    styles: [':host { padding: 8px; } kirby-card { --kirby-card-padding-top: 0px; }'],
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
