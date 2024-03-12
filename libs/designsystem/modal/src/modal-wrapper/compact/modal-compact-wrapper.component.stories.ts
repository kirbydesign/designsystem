import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { Component, importProvidersFrom } from '@angular/core';
import { PageModule } from '@kirbydesign/designsystem/page';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { AlertHelper, CanDismissHelper } from '../../public_api';
import { ModalCompactWrapperComponent } from './modal-compact-wrapper.component';

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
    applicationConfig({
      providers: [importProvidersFrom(KirbyIonicModule)],
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
