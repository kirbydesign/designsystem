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
 * By default, a banner will render as a card with a header, and a placeholder text.
 */
export const Default: Story = {};

/**
 * If the title-property is set a header with the title is added to the card within the banner.
 */
export const Title: Story = {
  args: {
    title: 'Example title',
  },
};
