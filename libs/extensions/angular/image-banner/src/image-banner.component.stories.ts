import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { ImageBannerComponent } from '@kirbydesign/extensions-angular/image-banner';
import { responsiveModes } from 'tools/storybook-config/shared-config';

/**
 * The image banner is a dynamic UI component designed to grab attention and convey key messages.
 * It can combine a delightful visual background and text to highlight promotional content or other important information.
 */
const meta: Meta<ImageBannerComponent> = {
  component: ImageBannerComponent,
  title: 'Components/Banner/Image Banner',
  parameters: {
    actions: {
      handles: ['dismissClick'],
    },
    controls: {
      exclude: ['bannerClicked', 'dismissClicked'],
    },
    chromatic: {
      modes: {
        ...responsiveModes,
      },
    },
  },
  argTypes: {
    bannerClick: {
      control: false,
    },
    dismissClick: {
      control: false,
    },
    externalLink: {
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<ImageBannerComponent>;

/**
 * This is a default image banner with a header, image and body text.
 */
export const Default: Story = {
  args: {
    title: 'An Image Banner',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/images/leaves.jpg',
    backgroundBlur: 'dark',
  },
};

/**
 * By default the background is a darkened and blurred version of the provided image.
 * If needed, the background blur property can be set to `light` to make the background brigther, or `none` to make the background white.
 * You can test out different background images by inserting your own link for the `imagePath` in the API table above.
 */
export const LightBackgroundBlur: Story = {
  args: {
    title: 'Light Background Blur',
    bodyText: 'This is the body text.',
    imagePath: 'assets/images/leaves.jpg',
    backgroundBlur: 'light',
    actionButtonText: 'Read more',
  },
};

export const NoBackgroundBlur: Story = {
  args: {
    title: 'No Background Blur',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/images/leaves.jpg',
    backgroundBlur: 'none',
  },
};

/**
 * An external link can be set to navigate outside the current application when the user activates the banner or the action button within.
 */
export const ExternalLink: Story = {
  args: {
    title: 'Image Banner with External Link',
    bodyText: 'Activating this banner will take you to www.kirby.design 👋',
    actionButtonText: 'Go to Kirby Design',
    externalLink: 'http://www.kirby.design',
    imagePath: 'assets/images/leaves.jpg',
  },
};

/**
 * A dismiss button is shown whenever an event-binding is added for the `bannerDismiss` event.
 * If no dismiss button is needed, simply avoid binding to the event.
 */
export const NoDismiss: Story = {
  args: {
    title: 'No Dismiss in Banner',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/images/leaves.jpg',
    dismissClick: undefined,
  },
  // The render method with argsToTemplate() is needed for bannerDismiss to not be automatically inferred by storybook.
  render: (args) => ({
    props: args,
    template: `<kirby-x-image-banner ${argsToTemplate(args)}></kirby-x-image-banner>`,
  }),
};

/**
 * The component adapts to the containers width, and thus should be plug and
 * play with the kirby css grid and slider utilities.
 * It switches between a narrow and wide view.
 */
export const UsageInGrid: Story = {
  args: {
    title: 'Banners that adapt in grid',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/images/leaves.jpg',
    externalLink: 'http://www.kirby.design',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="kirby-grid">
        <div class="kirby-grid-item" xs="12">
          <kirby-x-image-banner ${argsToTemplate(args)}></kirby-x-image-banner>
        </div>
        <div class="kirby-grid-item" xs="6">
          <kirby-x-image-banner ${argsToTemplate(args)}></kirby-x-image-banner>
        </div>
        <div class="kirby-grid-item" xs="6">
          <kirby-x-image-banner ${argsToTemplate(args)}></kirby-x-image-banner>
        </div>
      </div>

`,
  }),
};
