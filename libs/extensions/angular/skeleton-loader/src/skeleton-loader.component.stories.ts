import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';

/**
 * A Skeleton is a visual indicator that is used to render placeholder content and mimic the full content shown when loaded.
 * Themes
 * There are two types of themes:
 * 1. OnLight - A darker version to be used on white and light grey backgrounds.
 * 2. OnDark - A lighter version used on dark colors and brand background.
 *
 * ###Best practices
 * - The Skeleton is used as an indicator to load content on an entire page, content on a card.
 * - Only use skeleton states on container-based components. Fx cards and lists or data-based components like data tables. In most cases, buttons, input fields, checkboxes, toggles should not have a skeleton state.
 * - Aim for simple low contrast skeleton screens that does not attract too much attention. Avoid designing high contrast skeleton views, where dark skeletons are placed on white backgrounds. Go for white skeletons on white background even though the final rendering is fx a dark card on white background.
 * - Use af skeleton or spinner if load time is between 750ms and 10 seconds.
 * - If a load is faster than 750ms don’t use af skeleton or spinner, as this most likely won’t make a positive difference for the user experience. Most likely it will just show an annoying flash of spinner og skeleton that wil be distracting.
 * - If page load is slower than 10 seconds consider using a progress bar instead.
 *
 * ###Loading
 *  - A skeleton is placed inside a loading component to load content from the backend (E.g. loading a Cards content or a sites Content)
 *  - We try to show the data that is available and only load the content that has to be loaded by the backend (E.g. if we load a sites content we show the page-title and the content that we know of).
 */
const meta: Meta<SkeletonLoaderComponent> = {
  component: SkeletonLoaderComponent,
  title: 'Components/Loaders/Skeleton Loader',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, CardModule, ItemModule],
    }),
  ],
  parameters: {
    actions: {},
    controls: { exclude: ['_height', '_width', '_borderRadius'] },
    chromatic: {
      modes: {},
    },
  },
  argTypes: {
    height: {
      control: 'number',
    },
    width: {
      control: 'number',
    },
    borderRadius: {
      control: {
        type: 'select',
        options: ['xxs', 'xs', 's', 'n', 'l', 'xl', 'circle', 'pill'],
      },
    },
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
 * Example.
 */
export const Default: Story = {
  args: {
    height: 16,
    width: 100,
    borderRadius: 'xxs',
    theme: 'light',
  },
};

/**
 * Example card using dark theme.
 */
export const DarkCard: Story = {
  args: {
    theme: 'dark',
  },
  render: (args) => ({
    props: args,
    styles: [
      ' .skeleton-card { width: 350px; background-color: var(--kirby-decoration-color-blue-80); padding: 6px 0 }',
      ' :host kirby-item { --kirby-item-background: transparent; }',
      ' .text { display: flex; flex-direction: column; justify-content: space-evenly; height: 50px; }',
      ' .end { align-items: flex-end }',
    ],
    template: `
     <kirby-card class="skeleton-card">
      <kirby-item class="skeleton-example">
        <div slot="start">
          <kirby-x-skeleton-loader [height]="60" [width]="60" borderRadius="circle" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
        </div>
        <div class="text text1">
          <kirby-x-skeleton-loader [height]="18" [width]="100" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader [height]="14" [width]="50" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
        </div>
        <div class="text end" slot="end">
          <kirby-x-skeleton-loader [height]="18" [width]="100" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader [height]="14" [width]="50" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
        </div>
      </kirby-item>
      </kirby-card>
    `,
  }),
};

/**
 * Example card using light theme.
 */
export const LightCard: Story = {
  args: {
    theme: 'light',
  },
  render: (args) => ({
    props: args,
    styles: [
      ' .skeleton-card { width: 350px; background-color: var(--kirby-white); padding: 6px 0 }',
      ' :host kirby-item { --kirby-item-background: transparent; }',
      ' .text { display: flex; flex-direction: column; justify-content: space-evenly; height: 50px; }',
      ' .end { align-items: flex-end }',
    ],
    template: `
     <kirby-card class="skeleton-card">
      <kirby-item class="skeleton-example">
        <div slot="start">
          <kirby-x-skeleton-loader [height]="60" [width]="60" borderRadius="circle" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
        </div>
        <div class="text text1">
          <kirby-x-skeleton-loader [height]="18" [width]="100" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader [height]="14" [width]="50" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
        </div>
        <div class="text end" slot="end">
          <kirby-x-skeleton-loader [height]="18" [width]="100" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
          <kirby-x-skeleton-loader [height]="14" [width]="50" borderRadius="xs" ${argsToTemplate(args)}></kirby-x-skeleton-loader>
        </div>
      </kirby-item>
      </kirby-card>
    `,
  }),
};
