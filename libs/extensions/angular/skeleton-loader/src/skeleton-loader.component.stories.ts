import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';

/**
 * A skeleton loader is a visual indicator that is used to render placeholder content and mimic the full content shown when loaded.
 *
 * ## Sizing
 * The skeleton loaders dimensions can be controlled with width and height css-properties on the element itself. Consider using the existing design tokens from Kirby when assigning these values.
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
 * Any custom border radius can be set by using the `border-radius` css property directly, instead of using the shape property.
 */
export const Shape: Story = {
  render: (args) => ({
    props: args,
    styles: ['div { display: flex; gap: var(--kirby-spacing-xs); flex-direction: column; }'],
    template: `<div>
      <kirby-x-skeleton-loader style="width: 100px;" shape="rectangle"></kirby-x-skeleton-loader>
      <kirby-x-skeleton-loader style="width: 100px; height: var(--kirby-spacing-l);" shape="pill"></kirby-x-skeleton-loader>
      <kirby-x-skeleton-loader style="height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl);" shape="circle"></kirby-x-skeleton-loader>
      <kirby-x-skeleton-loader style="border-radius: var(--kirby-border-radius-n); height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl);"></kirby-x-skeleton-loader>
    </div>`,
  }),
  argTypes: {
    theme: { control: { disable: true } },
    shape: { control: { disable: true } },
  },
};

/**
 * A skeleton loader on a dark background. In this case theme selection happens automatically based on `themeColor` on kirby-card.
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
          <kirby-x-skeleton-loader shape="circle" style="height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl);"></kirby-x-skeleton-loader>
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
 * A skeleton loader on a light background.
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
          <kirby-x-skeleton-loader shape="circle" style="height: var(--kirby-spacing-xxxl); width: var(--kirby-spacing-xxxl);"></kirby-x-skeleton-loader>
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
