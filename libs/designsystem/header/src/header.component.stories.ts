import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HeaderComponent } from '@kirbydesign/designsystem/header';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

import { responsiveModes } from 'tools/storybook-config/shared-config';
import { HeaderExampleComponent } from '~/app/examples/header-example/header-example.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'Components / Header',
  decorators: [
    moduleMetadata({
      imports: [HeaderComponent, HeaderExampleComponent, FlagComponent],
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
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Title',
    value: '',
    valueUnit: '',
    subtitle1: 'Subtitle',
    subtitle2: '',
    hasInteractiveTitle: false,
    centered: false,
    titleMaxLines: 0,
    emphasizeActions: false,
  },
};

export const CookbookExamples: Story = {
  parameters: {
    // The embedded progress circle reveals its value via an IntersectionObserver-triggered
    // CSS transition. Because the reveal is JS-driven, Chromatic cannot deterministically pause
    // it and may capture the mid-animation round-linecap "dot". Delay capture until it settles.
    chromatic: { delay: 1500 },
  },
  render: () => ({
    template: `<cookbook-header-example></cookbook-header-example>`,
  }),
};

/**
 * Acceptance tests for titleMaxLines scaling behavior.
 * Each scenario verifies that the title font size is only scaled down
 * when the text genuinely cannot fit within the configured max lines.
 */
export const TitleMaxLinesScaling: Story = {
  parameters: {
    chromatic: {
      modes: {
        mobile: {
          viewport: 'small',
        },
      },
    },
  },
  render: () => ({
    template: `
      <!-- Title only -->
      <kirby-header title="Just a header" subtitle1="no max lines"></kirby-header>
      <kirby-header title="Just a header" [titleMaxLines]="1" subtitle1="titleMaxLines=1"></kirby-header>

      <!-- Medium and long titles -->
      <kirby-header title="A medium length title that might need scaling on smaller screens" [titleMaxLines]="1" subtitle1="titleMaxLines=1, medium title"></kirby-header>
      <kirby-header title="A medium length title that might need scaling on smaller screens" [titleMaxLines]="2" subtitle1="titleMaxLines=2, medium title"></kirby-header>
      <kirby-header title="Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization" [titleMaxLines]="3" subtitle1="titleMaxLines=3, very long title"></kirby-header>

      <!-- Key value: titleMaxLines scales the value -->
      <kirby-header title="Savings" value="12.345,67" valueUnit="kr." subtitle1="key value, no max lines"></kirby-header>
      <kirby-header title="Savings" value="12.345,67" valueUnit="kr." [titleMaxLines]="1" subtitle1="key value, titleMaxLines=1"></kirby-header>
      <kirby-header title="Savings" value="1.234.567.890,12" valueUnit="kr." [titleMaxLines]="1" subtitle1="key value, long value, titleMaxLines=1"></kirby-header>

      <!-- Centered -->
      <kirby-header title="Just a header" [titleMaxLines]="1" [centered]="true" subtitle1="centered, titleMaxLines=1"></kirby-header>
      <kirby-header title="Just a header" [centered]="true" subtitle1="centered, no max lines"></kirby-header>

      <!-- With flag -->
      <kirby-header title="Just a header" [titleMaxLines]="1" subtitle1="with flag, titleMaxLines=1">
        <kirby-flag themeColor="success">Active</kirby-flag>
      </kirby-header>
    `,
  }),
};
