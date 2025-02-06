import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';

/**
 * A Skeleton is a visual indicator that is used to render placeholder content and mimic the full content shown when loaded.
 * ### Themes
 * There are two types of themes:
 * 1. OnLight - A darker version to be used on white and light grey backgrounds.
 * 2. OnDark - A lighter version used on dark colors and brand background.
 *
 * ### Best practices
 * - The Skeleton is used as an indicator to load content on an entire page, content on a card.
 * - Only use skeleton states on container-based components. Fx cards and lists or data-based components like data tables. In most cases, buttons, input fields, checkboxes, toggles should not have a skeleton state.
 * - Aim for simple low contrast skeleton screens that does not attract too much attention. Avoid designing high contrast skeleton views, where dark skeletons are placed on white backgrounds. Go for white skeletons on white background even though the final rendering is fx a dark card on white background.
 * - Use af skeleton or spinner if load time is between 750ms and 10 seconds.
 * - If a load is faster than 750ms don’t use af skeleton or spinner, as this most likely won’t make a positive difference for the user experience. Most likely it will just show an annoying flash of spinner og skeleton that wil be distracting.
 * - If page load is slower than 10 seconds consider using a progress bar instead.
 *
 * ### Loading
 *  - A skeleton is placed inside a loading component to load content from the backend (E.g. loading a Cards content or a sites Content)
 *  - We try to show the data that is available and only load the content that has to be loaded by the backend (E.g. if we load a sites content we show the page-title and the content that we know of).
 *
 * ### Sizing
 * The skeleton-dimensions can be controlled with width and height css-properties on the element itself. Consider using the existing design tokens from Kirby when assigning these values.
 * Out of the box, the skeleton loader will fill its parent containers width, while maintaining a height matching the browsers base font size.
 *
 */
const meta: Meta<SkeletonLoaderComponent> = {
  component: SkeletonLoaderComponent,
  title: 'Components/Loaders/Skeleton Loader',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, CardModule, ItemModule],
    }),
  ],
  args: {
    theme: 'light',
    shape: 'rectangle',
  },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['light', 'dark'],
      },
    },
  },
};
export default meta;
type Story = StoryObj<SkeletonLoaderComponent>;

/**
 * By default the skeleton loader fills its parent containers width, while maintaining a height matching the browsers base font size.
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-skeleton-loader ${argsToTemplate(args)}></kirby-x-skeleton-loader>
    `,
  }),
};

/**
 * The skeleton loader can be styled as a rectangle, pill or circle.
 */
export const Shape: Story = {
  render: (args) => ({
    props: args,
    styles: ['div { display: flex; gap: var(--kirby-spacing-xs); flex-direction: column; }'],
    template: `<div>
      <kirby-x-skeleton-loader style="width: 100px;" shape="rectangle"></kirby-x-skeleton-loader>
      <kirby-x-skeleton-loader style="width: 100px; height: var(--kirby-spacing-l);" shape="pill"></kirby-x-skeleton-loader>
      <kirby-x-skeleton-loader style="height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl);" shape="circle"></kirby-x-skeleton-loader>
    </div>`,
  }),
  argTypes: {
    theme: { control: { disable: true } },
    shape: { control: { disable: true } },
  },
};

/**
 * A light skeleton loader on a dark background.
 */
export const DarkCard: Story = {
  render: (args) => ({
    props: args,
    styles: [
      ' .skeleton-card { width: 350px; padding: 6px 0; }',
      ' .text { display: flex; flex-direction: column; justify-content: space-evenly; height: 50px; }',
      ' .end { align-items: flex-end }',
    ],
    template: `<kirby-card themeColor="dark" class="skeleton-card">
      <kirby-item style="--kirby-item-background: transparent;">
        <div slot="start">
          <kirby-x-skeleton-loader style="height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl); border-radius: var(--kirby-border-radius-circle);"></kirby-x-skeleton-loader>
        </div>
        <div class="text">
          <kirby-x-skeleton-loader style="height: var(--kirby-font-size-m); width: 100px;"></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader style="width: 50px;"></kirby-x-skeleton-loader>
        </div>
        <div class="text end" slot="end">
          <kirby-x-skeleton-loader style="height: var(--kirby-font-size-m); width: 100px;"></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader style="width: 50px;"></kirby-x-skeleton-loader>
        </div>
      </kirby-item>
    </kirby-card>`,
  }),
  argTypes: {
    theme: { control: { disable: true } },
    shape: { control: { disable: true } },
  },
};

/**
 * A dark skeleton loader on a light background.
 */
export const LightCard: Story = {
  render: (args) => ({
    props: args,
    styles: [
      ' .skeleton-card { width: 350px; padding: 6px 0; }',
      ' .text { display: flex; flex-direction: column; justify-content: space-evenly; height: 50px; }',
      ' .end { align-items: flex-end }',
    ],
    template: `<kirby-card class="skeleton-card">
      <kirby-item style="--kirby-item-background: transparent;">
        <div slot="start">
          <kirby-x-skeleton-loader style="height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl); border-radius: var(--kirby-border-radius-circle);"></kirby-x-skeleton-loader>
        </div>
        <div class="text">
          <kirby-x-skeleton-loader style="height: var(--kirby-font-size-m); width: 100px;"></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader style="width: 50px;"></kirby-x-skeleton-loader>
        </div>
        <div class="text end" slot="end">
          <kirby-x-skeleton-loader style="height: var(--kirby-font-size-m); width: 100px;"></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader style="width: 50px;"></kirby-x-skeleton-loader>
        </div>
      </kirby-item>
    </kirby-card>`,
  }),
  argTypes: {
    theme: { control: { disable: true } },
    shape: { control: { disable: true } },
  },
};
