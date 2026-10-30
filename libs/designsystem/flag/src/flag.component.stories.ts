import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { FlagComponent, FlagThemeColor } from '@kirbydesign/designsystem/flag';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<FlagComponent> = {
  component: FlagComponent,
  title: 'Components / Flag',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<FlagComponent>;

export const Flag: Story = {
  args: {
    size: 'md',
    themeColor: 'transparent',
  },
  argTypes: {
    themeColor: {
      options: ['white', 'success', 'warning', 'danger'],
      control: { type: 'radio' },
    },
  },
  render: (args) => ({
    props: args,
    template: `<kirby-flag ${argsToTemplate(args)}>Flag</kirby-flag>
  `,
  }),
};

const themeColors: FlagThemeColor[] = ['transparent', 'semi-light', 'success', 'warning', 'danger'];
const sizes: FlagComponent['size'][] = ['md', 'sm', 'xs'];

export const Surfaces: Story = {
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (themeColor of themeColors; track themeColor) {
      <p class="kirby-text-small-light">{{ themeColor }}</p>
      <div class="row">
        @for (size of sizes; track size) {
          <kirby-flag [themeColor]="themeColor" [size]="size">{{ size }}</kirby-flag>
        }
      </div>
    }
  `,
    '320px',
    { themeColors, sizes }
  ),
};
