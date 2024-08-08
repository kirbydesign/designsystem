import { type Meta, type StoryObj } from '@storybook/angular';
import { ImageBannerComponent } from '@kirbydesign/extensions-angular/image-banner';

/**
 * TODO: Awaiting banner description from UX guidelines.
 */
const meta: Meta<ImageBannerComponent> = {
  component: ImageBannerComponent,
  title: 'Components/Banner/Image Banner',
  parameters: {
    controls: {
      exclude: ['bannerClicked'],
    },
  },
  argTypes: {
    bannerClick: {
      control: false,
    },
  },
};
export default meta;
type Story = StoryObj<ImageBannerComponent>;

/**
 * This is a default image banner with a header, image and body text. The whole banner is interactive, and will emit the bannerClick event when activated by click, keyboard etc.
 */
export const Default: Story = {
  args: {
    title: 'An Image Banner',
    bodyText: 'This is the body text.',
    imagePath: 'assets/autocamper.jpg',
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
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'assets/couple.jpg',
    backgroundBlur: 'light',
    actionButtonText: 'Go somewhere!',
  },
};

export const NoBackgroundBlur: Story = {
  args: {
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'assets/autocamper.jpg',
    backgroundBlur: 'none',
  },
};

/**
 * An external link can be set to navigate outside the current application when the user activates the banner or the action button within.
 */
export const ExternalLink: Story = {
  args: {
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'https://images.unsplash.com/photo-1515876305430-f06edab8282a',
    actionButtonText: 'Go anywhere!',
    externalLink: 'http://www.kirby.design',
  },
};
