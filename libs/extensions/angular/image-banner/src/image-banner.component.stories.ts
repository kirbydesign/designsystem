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
    actions: { handles: ['dismissClick'] },
    controls: { exclude: ['bannerClicked', 'dismissClicked', 'onImageError', 'translations'] },
    chromatic: { modes: { ...responsiveModes } },
  },
  argTypes: {
    title: { control: 'text' },
    bodyText: { control: 'text' },
    actionButtonText: { control: 'text', table: { defaultValue: { summary: 'Read more' } } },
    imagePath: { control: 'text' },
    bannerClick: { control: false },
    dismissClick: { control: false },
    imageError: { control: false },
    showButtonInNarrowView: { control: 'boolean' },
    externalLink: { control: 'text' },
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
  },
};

export const NoBackgroundBlur: Story = {
  args: {
    title: 'No Background Blur',
    bodyText: 'This is the body text.',
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
 * By default the title is truncated with an ellipsis when it exceeds the width of the banner, and body text can be a maximum of three lines.
 * If these defaults are unwanted custom `title` and `bodyText` markup can instead be provided to the image banner which can be styled as needed.
 */
export const CustomContent: Story = {
  args: { imagePath: 'assets/images/leaves.jpg' },

  render: (args) => ({
    props: args,
    styles: [
      ' .ellipsis{ white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}',
      ' .no-ellipsis {white-space:wrap}',
    ],
    template: `
      <kirby-x-image-banner ${argsToTemplate(args)}>
        <div class="no-ellipsis" title>The title is very long and will NOT be truncated with an ellipsis when it exceeds the width of the banner</div>
        <div class="ellipsis" bodyText>A lot of text that should be truncated with an ellipsis when it exceeds the width of the banner.</div>
      </kirby-x-image-banner>
    `,
  }),
};

/**
 * The components min-height can be overridden with the custom css property `--kirby-x-image-banner-min-height`.
 * In this case it is set to `auto` to allow the image banners height to adjust automatically when only a title is set.
 */
export const CustomMinimumHeight: Story = {
  args: {
    title: 'This card is narrow and only has a title',
    imagePath: 'assets/images/leaves.jpg',
  },

  render: (args) => ({
    props: args,
    styles: ['.narrow-wrapper { max-width: 500px; margin; auto}'],
    template: `
      <div class="narrow-wrapper">
        <kirby-x-image-banner style="--kirby-x-image-banner-min-height: auto;" ${argsToTemplate(args)}></kirby-x-image-banner>
      </div>
    `,
  }),
};

/**
 *  You can toggle the `showButtonInNarrowView` to true to make the button appear in narrow views in addition to in the full width view.
 */

export const ButtonInNarrowView: Story = {
  args: {
    showButtonInNarrowView: true,
    title: 'This card is narrow, but has the button shown',
    bodyText: 'This is the body text.',
    imagePath: 'assets/images/leaves.jpg',
  },
  render: (args) => ({
    props: args,
    styles: ['.narrow-wrapper { max-width: 500px; margin; auto}'],
    template: `
      <div class="narrow-wrapper">
        <kirby-x-image-banner ${argsToTemplate(args)}></kirby-x-image-banner>
      </div>
    `,
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

const handleImageError = (event: Event) => {
  const image = event?.target as HTMLImageElement;
  image.src = 'assets/images/not-found.png';
};

/**
 * If a fallback image is needed when the provided image path results in an error,
 * subscribe to the `imageError` event and update the imagePath to an alternative image in your handler function.
 */
export const ImageError: Story = {
  args: {
    title: 'Image Banner with Fallback Image',
    bodyText: 'This is the body text.',
    imageError: handleImageError,
    imagePath: 'assets/images/does-not-exist.jpg',
  },
};
