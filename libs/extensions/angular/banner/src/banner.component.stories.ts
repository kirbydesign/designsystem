import type { Meta, StoryObj } from '@storybook/angular';
import { BannerComponent } from '@kirbydesign/extensions-angular/banner';

/**
 * The Banner component is x, y, z. It is intended for use in this and that use-case.
 */
const meta: Meta<BannerComponent> = {
  component: BannerComponent,
  title: 'Components/Banner',
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
    actionButtonText: 'Go somewhere!',
    imagePath: 'https://placehold.co/2000x1000/333/EEEEEE',
  },
};

/**
 * If the image filter is set to dark, the banner darkens the blurred backround image.
 */
export const DarkImageFilter: Story = {
  args: {
    title: 'Another amazing title',
    bodyText: 'This is a really good body text for use with a banner',
    imagePath: 'https://placehold.co/2000x1000/333/EEEEEE',
    actionButtonText: 'Go!',
    imageFilter: 'dark',
  },
};
