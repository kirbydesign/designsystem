import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { ImageBannerComponent } from '@kirbydesign/extensions-angular/image-banner';

/**
 * TODO: Awaiting banner description from UX guidelines.
 */
const meta: Meta<ImageBannerComponent> = {
  component: ImageBannerComponent,
  title: 'Components/Banner/Image Banner',
  parameters: {
    actions: {
      handles: ['bannerDismiss'],
    },
    controls: {
      exclude: ['bannerClicked', 'bannerDismissed'],
    },
  },
  argTypes: {
    bannerClick: {
      control: false,
    },
    bannerDismiss: {
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
 * The whole banner is interactive, and will emit the bannerClick event when activated by click, keyboard etc.
 */
export const Default: Story = {
  args: {
    title: 'An Image Banner',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/autocamper.png',
    backgroundBlur: 'dark',
  },
};

/**
 * By default the background is a darkened and blurred version of the banners image.
 * If needed, the background blur property can be set to `light` to make the background brigther, or `none` to make the background white.
 * You can test out different background images by inserting your own link for the `imagePath` in the API table above.
 */
export const LightBackgroundBlur: Story = {
  args: {
    title: 'Light Background Blur',
    bodyText: 'This is the body text.',
    imagePath: 'assets/mountains.png',
    backgroundBlur: 'light',
    actionButtonText: 'Read more',
  },
};

export const NoBackgroundBlur: Story = {
  args: {
    title: 'No Background Blur',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/autocamper.png',
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
    imagePath: 'assets/autocamper.png',
  },
};

/**
 * A dismiss-button is shown whenever an event-binding is added for the `bannerDismiss` event.
 * If no dismiss-button is needed, simply avoid binding to the event.
 */
export const NoDismiss: Story = {
  args: {
    title: 'No Dismiss in Banner',
    bodyText: 'This is the body text.',
    actionButtonText: 'Read more',
    imagePath: 'assets/autocamper.png',
    backgroundBlur: 'dark',
    bannerDismiss: undefined,
  },
  // The render method with argsToTemplate() is needed for bannerDismiss to not be automatically inferred by storybook.
  render: (args: ImageBannerComponent) => ({
    props: args,
    template: `<kirby-x-image-banner ${argsToTemplate(args)}></kirby-x-image-banner>`,
  }),
};
