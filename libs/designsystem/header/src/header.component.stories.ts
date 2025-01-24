import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HeaderComponent, HeaderModule } from '@kirbydesign/designsystem/header';

import { responsiveModes } from 'tools/storybook-config/shared-config';
import { HeaderExampleComponent } from '~/app/examples/header-example/header-example.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'Components / Header',
  decorators: [
    moduleMetadata({
      imports: [HeaderModule, HeaderExampleComponent],
    }),
  ],
  parameters: {
    chromatic: {
      modes: {
        ...responsiveModes,
      },
    },
  },
};
export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Title',
    value: '',
    valueUnit: '',
    subtitle1: 'Subtitle',
    subtitle2: '',
    hasInteractiveTitle: false,
    centered: false,
    titleMaxLines: 0,
    emphasizeActions: false,
  },
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-header-example></cookbook-header-example>`,
  }),
};
