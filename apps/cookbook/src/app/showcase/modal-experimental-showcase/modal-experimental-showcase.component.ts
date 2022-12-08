import { Component } from '@angular/core';
import { ModalExperimentalController } from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';
import { ModalControllerExperimentalExampleComponent } from '../../examples/modal-experimental-example/controller/modal-controller-experimental-example.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';

@Component({
  selector: 'cookbook-modal-experimental-showcase',
  templateUrl: './modal-experimental-showcase.component.html',
  styleUrls: ['./modal-experimental-showcase.component.scss'],
})
export class ModalExperimentalShowcaseComponent {
  constructor(private modalController: ModalExperimentalController) {}

  componentProperties: ApiDescriptionProperty[] = [
    {
      name: 'open',
      description: `Determines if the modal should be shown or not`,
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'canDismiss',
      description: `(Optional) Determines whether or not a modal can dismiss when calling the dismiss method.

      If the value is true or the value's function returns true, the modal will close when trying to dismiss. If the value is false or the value's function returns false, the modal will not close when trying to dismiss.`,
      defaultValue: 'true',
      type: ['(() => Promise<boolean>)', 'boolean'],
    },
    {
      name: 'title',
      description: `The title of the modal`,
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'collapseTitle',
      description: `(Optional) If \`true\` will cause the title to initially be rendered as part of the content; once scrolled out of view it collapses and appears in the header area. 
      \n Useful for long titles that would otherwise truncate. `,
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling in the modal',
      type: ['true', 'false'],
      defaultValue: 'false',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'willPresent',
      description: 'Emitted before the modal has presented',
      signature: 'Promise<void>',
    },
    {
      name: 'didPresent',
      description: 'Emitted after the modal has presented.',
      signature: 'Promise<void>',
    },
    {
      name: 'willDismiss',
      description: 'Emitted before the modal has dismissed.',
      signature: 'Promise<void>',
    },
    {
      name: 'didDismiss',
      description: 'Emitted after the modal has dismissed.',
      signature: 'Promise<void>',
    },
  ];

  methods: ApiDescriptionMethod[] = [
    {
      name: 'scrollToTop',
      description:
        'Scrolls to the top of the modal body. It takes an optional input of "KirbyAnimation.Duration", fx. KirbyAnimation.Duration.SHORT. This method will have no effect if "scrollDisabled" is set to "true"',
      signature: 'void',
    },
    {
      name: 'scrollToBottom',
      description:
        'Scrolls to the bottom of the modal body. It takes an optional input of "KirbyAnimation.Duration", fx. KirbyAnimation.Duration.SHORT. This method will have no effect if "scrollDisabled" is set to "true"',
      signature: 'void',
    },
  ];

  async openModal() {
    const modal = await this.modalController.showModal({
      flavor: 'modal',
      component: ModalControllerExperimentalExampleComponent,
      componentProps: {
        title: 'Hi there',
      },
    });

    modal?.data.subscribe((modalData) => {
      const { data, role } = modalData;
      console.log('this is data & role', data, role);
    });

    // const { data, role } = await modal.onWillDismiss();

    // console.log('This is data and role', data, role);
  }

  openRoute() {
    this.modalController.navigateToModal('page1');
  }
}
