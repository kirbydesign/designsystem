import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import {
  CardAsButtonDirective,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
} from '@kirbydesign/designsystem/card';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { FormFieldModule, InputComponent } from '@kirbydesign/designsystem/form-field';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { ThemeColor } from '@kirbydesign/designsystem/helpers';
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
        CardFooterComponent,
        ItemComponent,
        LabelComponent,
        BadgeComponent,
        ButtonComponent,
        DividerComponent,
        FormFieldModule,
        InputComponent,
        IconComponent,
        ThemeColorDirective,
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

type CardColor = {
  label: string;
  themeColor?: ThemeColor;
  variant?: CardComponent['variant'];
};

const themeColors: ThemeColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
  'light',
  'medium',
  'dark',
  'white',
];

const cardColors: CardColor[] = [
  { label: 'default' },
  ...themeColors.map((themeColor) => ({ label: themeColor, themeColor })),
];

const themeColorGridStyles = [
  `
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 280px);
    gap: var(--kirby-spacing-s);
    padding: var(--kirby-spacing-s);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--kirby-spacing-xs);
    margin-block: var(--kirby-spacing-xs);
  }
  `,
];

const cardContent = `
  <kirby-card-header [title]="color.label" subtitle="Card header subtitle"></kirby-card-header>
  <p class="kirby-text-normal">Body text on the card surface.</p>
  <p class="kirby-text-small-light">Secondary small text</p>
  <div class="row">
    <kirby-badge text="Badge"></kirby-badge>
    <kirby-badge themeColor="success" text="Success"></kirby-badge>
    <kirby-icon name="person"></kirby-icon>
  </div>
  <kirby-form-field label="Input label">
    <input kirby-input placeholder="Placeholder" />
  </kirby-form-field>
  <kirby-divider [hasMargin]="true"></kirby-divider>
  <kirby-item>
    <kirby-label>
      <p class="kirby-item-title">Item title</p>
      <p class="kirby-item-detail">Item detail</p>
    </kirby-label>
    <data slot="end" class="kirby-text-bold">1.234,56</data>
  </kirby-item>
  <kirby-item disclosure="arrow-more">
    <kirby-label>Item with disclosure</kirby-label>
  </kirby-item>
  <kirby-card-footer>
    <div class="row">
      <button kirby-button attentionLevel="1">Level 1</button>
      <button kirby-button attentionLevel="2">Level 2</button>
      <button kirby-button attentionLevel="3">Level 3</button>
    </div>
  </kirby-card-footer>
`;

const renderThemeColorGrid =
  (colors: CardColor[], content: string = cardContent) =>
  () => ({
    props: { colors },
    template: `
      <div class="grid">
        @for (color of colors; track color.label) {
          <kirby-card
            [variant]="color.variant ?? 'elevated'"
            [hasPadding]="true"
            [themeColor]="color.themeColor"
          >
            ${content}
          </kirby-card>
        }
      </div>
    `,
    styles: themeColorGridStyles,
  });

export const ThemeColors: Story = {
  render: renderThemeColorGrid([...cardColors, { label: 'outlined', variant: 'outlined' }]),
};
