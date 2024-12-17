import { type Meta, type StoryObj } from '@storybook/angular';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';

/**
 * A skeleton loader is a dynamic UI component designed to enhance user experience by visually indicating content loading.
 * It typically mimics the layout of the content being loaded, using placeholder shapes and animations to reassure users
 * and reduce perceived wait times.
 */
const meta: Meta<SkeletonLoaderComponent> = {
  component: SkeletonLoaderComponent,
  title: 'Components/Loaders/Skeleton Loader',
  parameters: {
    actions: {},
    controls: { exclude: ['_height', '_width', '_borderRadius'] },
    chromatic: {
      modes: {},
    },
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<SkeletonLoaderComponent>;

/**
 * This is a default skeleton loader.
 */
export const Default: Story = {
  args: {
    height: 16,
    width: 100,
    borderRadius: 'xxs',
    theme: 'dark',
  },
};
