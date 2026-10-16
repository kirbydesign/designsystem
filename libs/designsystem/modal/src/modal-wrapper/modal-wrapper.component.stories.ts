import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { PageTitleComponent } from '@kirbydesign/designsystem/page';
import {
  AlertHelper,
  CanDismissHelper,
  ModalComponent,
  ModalFooterComponent,
  ModalNavigationService,
  ModalWrapperComponent,
} from '@kirbydesign/designsystem/modal';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { responsiveModes } from 'tools/storybook-config/shared-config';

const meta: Meta<ModalWrapperComponent> = {
  component: ModalWrapperComponent,
  title: 'Components / Modal / ModalWrapper',
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        ModalComponent,
        ModalFooterComponent,
        PageTitleComponent,
        ButtonComponent,
      ],
      providers: [CanDismissHelper, AlertHelper, ModalNavigationService],
    }),
  ],
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
};
export default meta;
type Story = StoryObj<ModalWrapperComponent>;

// The wrapper depends on its ion-modal host, so it is rendered through an open inline modal.
// The min-height gives the snapshot an area that covers the overlay.
export const ModalWrapper: Story = {
  render: () => ({
    template: `
      <kirby-modal [isOpen]="true">
        <ng-template>
          <kirby-page-title>Modal title</kirby-page-title>
          <p class="kirby-text-normal">Modal content</p>
          <kirby-modal-footer>
            <button kirby-button>Action</button>
          </kirby-modal-footer>
        </ng-template>
      </kirby-modal>
    `,
    styles: [':host { display: block; min-height: 800px; }'],
  }),
};
