import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { Component } from '@angular/core';
import { PageModule } from '@kirbydesign/designsystem/page';
import {
  AlertHelper,
  CanDismissHelper,
  ModalCompactWrapperComponent,
} from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'kirby-embedded-modal-example',
  template: `
    <kirby-page-title>title</kirby-page-title>
  `,
  standalone: true,
  imports: [PageModule],
})
export class VrtEmbeddedModalExampleComponent {}

const meta: Meta<ModalCompactWrapperComponent> = {
  component: ModalCompactWrapperComponent,
  title: 'ModalCompactWrapperComponent',
  decorators: [
    moduleMetadata({
      providers: [CanDismissHelper, AlertHelper],
    }),
  ],
};
export default meta;
type Story = StoryObj<ModalCompactWrapperComponent>;

export const Default: Story = {
  args: {
    config: {
      component: VrtEmbeddedModalExampleComponent,
    },
  },
};
