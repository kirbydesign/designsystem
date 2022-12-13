import { Component } from '@angular/core';
import { ModalExperimentalController } from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';
import { ActionSheetController } from '@ionic/angular';
import {
  ModalControllerExperimentalExampleComponent,
  showModalCodeSnippet,
} from '../../examples/modal-experimental-example/controller/modal-controller-experimental-example.component';
import {
  footerSlotExampleTemplate,
  fullscreenModalExampleTemplate,
  headerStartSlotExampleTemplate,
} from '~/app/examples/modal-experimental-example/fullscreen/fullscreen-experimental-example.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';

@Component({
  selector: 'cookbook-modal-experimental-showcase',
  templateUrl: './modal-experimental-showcase.component.html',
  styleUrls: ['./modal-experimental-showcase.component.scss'],
})
export class ModalExperimentalShowcaseComponent {
  constructor(
    private modalController: ModalExperimentalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  fullscreenModalExampleTemplate: string = fullscreenModalExampleTemplate;
  headerStartSlotExampleTemplate: string = headerStartSlotExampleTemplate;
  footerSlotExampleTemplate: string = footerSlotExampleTemplate;
  showModalCodeSnippet: string = showModalCodeSnippet;

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

  footerProperties: ApiDescriptionProperty[] = [
    {
      name: 'type',
      description:
        'Sets the type of the footer. When inline the footer will have a transparent background and no shadow.',
      type: ['fixed', 'inline'],
      defaultValue: 'fixed',
    },
  ];

  controllerProperties: ApiDescriptionProperty[] = [
    {
      name: 'flavor',
      description: `(Optional) The flavor of the modal. 
      
      Modals with \`modal\` flavor have a close button placed in the top right corner and are full-screen on small screens.`,
      defaultValue: 'modal',
      type: ['modal'],
    },
    {
      name: 'component',
      description: 'The component which will be rendered inside the modal.',
      defaultValue: '',
      type: ['Component'],
    },
    {
      name: 'componentProps',
      description: '(Optional) The data to pass to the modal component.',
      defaultValue: 'undefined',
      type: ['undefined | { [key: string]: any; }'],
    },
    {
      name: 'cssClass',
      description: `(Optional) Adds custom css classes to the modal. This allows for custom styling of the modal (see 'CSS Custom Properties' section).`,
      defaultValue: 'undefined',
      type: ['string | string[]'],
    },
    {
      name: 'canDismiss',
      description: `(Optional) If canDismiss is true, then the modal will close when users attempt to dismiss the modal. If canDismiss is false, then the modal will not close when users attempt to dismiss the modal.
      
      canDismiss can also be a function, which must return a Promise that resolves to either true or false. If the promise resolves to true, then the modal will dismiss. If the promise resolves to false, then the modal will not dismiss.
      `,
      defaultValue: 'undefined',
      type: ['boolean | (() => Promise<boolean>)'],
    },
    {
      name: 'backdropDismiss',
      description: `(Optional) If true, the modal will be dismissed when the backdrop is clicked.`,
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'showBackdrop',
      description: `(Optional) If true, a backdrop will be displayed behind the modal. This property controls whether or not the backdrop darkens the screen when the modal is presented. It does not control whether or not the backdrop is active or present in the DOM..`,
      defaultValue: 'true',
      type: ['boolean'],
    },
  ];

  wrapperComponentProperties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: `The title of the modal`,
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'hasCollapsibleTitle',
      description: `(Optional) If \`true\` will cause the title to initially be rendered as part of the content; once scrolled out of view it collapses and appears in the header area. 
      \n Useful for long titles that would otherwise truncate. `,
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling in the modal',
      type: ['true', 'false'],
      defaultValue: 'false',
    },
  ];

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  openModal(enableCanDismiss?: boolean) {
    const modal = this.modalController.showModal({
      flavor: 'modal',
      component: ModalControllerExperimentalExampleComponent,
      componentProps: {
        title: 'Hi there',
      },
      canDismiss: enableCanDismiss ? this.canDismiss : undefined,
    });

    modal.onWillDismiss().subscribe((response) => {
      const { role, data } = response;
      console.log('This is the role from the subscription', role);
      console.log('This is the data from the subscription', data);
    });
  }
}
