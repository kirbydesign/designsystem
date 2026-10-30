import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ModalFooterComponent } from '@kirbydesign/designsystem/modal';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../../../.storybook/story-helpers';

const meta: Meta<ModalFooterComponent> = {
  component: ModalFooterComponent,
  title: 'Components / Modal / ModalFooter',
  decorators: [
    moduleMetadata({
      imports: [ModalFooterComponent, ButtonComponent, CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ModalFooterComponent>;

export const ModalFooter: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
    themeColor: 'white',
  },
};

const footers = [
  { label: 'white', themeColor: 'white', type: 'fixed' },
  { label: 'light', themeColor: 'light', type: 'fixed' },
  { label: 'inline', themeColor: 'white', type: 'inline' },
];

export const Surfaces: Story = {
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (footer of footers; track footer.label) {
      <p class="kirby-text-small-light">{{ footer.label }}</p>
      <kirby-modal-footer [themeColor]="footer.themeColor" [type]="footer.type">
        <button kirby-button [noDecoration]="true">Help</button>
        <button kirby-button attentionLevel="2">Cancel</button>
        <button kirby-button attentionLevel="1">Save</button>
      </kirby-modal-footer>
    }
  `,
    '420px',
    { footers }
  ),
};
