import { type Meta, type StoryObj } from '@storybook/angular';
import { BannerComponent } from '@kirbydesign/extensions-angular/banner';

/**
 * The Banner component is x, y, z. It is intended for use in this and that use-case.
 */
const meta: Meta<BannerComponent> = {
  component: BannerComponent,
  title: 'Components/Banner',
  parameters: {
    controls: {
      exclude: ['bannerClicked'],
    },
  },
  argTypes: {
    actionClick: {
      control: false,
    },
  },
};
export default meta;
type Story = StoryObj<BannerComponent>;

/**
 * By default, a banner will render as a card with a header, image, body, action button and dismiss button.
 */
export const Default: Story = {
  args: {
    title: 'My amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    actionText: 'Go somewhere!',
    imagePath: 'https://images.unsplash.com/photo-1515876305430-f06edab8282a',
  },
};

/**
 * If the background blur property is set, a blurred version of the image is used as background for the banner.
 */
export const LightBackgroundBlur: Story = {
  args: {
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'https://images.unsplash.com/photo-1514415008039-efa173293080',
    actionText: 'Go anywhere!',
    backgroundBlur: 'light',
  },
};

export const NoBackgroundBlur: Story = {
  args: {
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'https://images.unsplash.com/photo-1638132035918-90a22beaab3b',
    actionText: 'Go anywhere!',
    backgroundBlur: 'none',
  },
};

/**
 * External link.
 */
export const ExternalLink: Story = {
  args: {
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'https://images.unsplash.com/photo-1515876305430-f06edab8282a',
    actionText: 'Go anywhere!',
    externalLink: 'http://www.kirby.design',
  },
};
