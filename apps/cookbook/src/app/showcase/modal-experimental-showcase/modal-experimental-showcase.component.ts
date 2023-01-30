import { Component } from '@angular/core';
import {
  ModalExperimentalConfig,
  ModalExperimentalController,
} from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';
import { ActionSheetController } from '@ionic/angular';
import {
  ModalControllerExperimentalExampleComponent,
  observableCodeSnippet,
  showModalCodeSnippet,
} from '../../examples/modal-experimental-example/controller/modal-controller-experimental-example.component';
import {
  footerSlotExampleTemplate,
  fullscreenModalExampleTemplateHTML,
  fullscreenModalExampleTemplateTS,
  headerStartSlotExampleTemplate,
} from '../../examples/modal-experimental-example/fullscreen/fullscreen-experimental-example.component';
import { ApiDescriptionEvent } from '../../shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionMethod } from '../../shared/api-description/api-description-methods/api-description-methods.component';
import { routerConfigCodeSnippet } from '../../examples/modal-experimental-example/modal-routing/modal-routing-experimental-example.component';

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

  fullscreenModalExampleTemplateHTML: string = fullscreenModalExampleTemplateHTML;
  fullscreenModalExampleTemplateTS: string = fullscreenModalExampleTemplateTS;
  headerStartSlotExampleTemplate: string = headerStartSlotExampleTemplate;
  footerSlotExampleTemplate: string = footerSlotExampleTemplate;
  showModalCodeSnippet: string = showModalCodeSnippet;
  observableCodeSnippet: string = observableCodeSnippet;
  routerConfigCodeSnippet: string = routerConfigCodeSnippet;

  componentProperties: ApiDescriptionProperty[] = [
    {
      name: 'open',
      description: `Determines if the modal should be shown or not.`,
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'canDismiss',
      description: `(Optional) Determines whether or not a modal can dismiss when calling the dismiss method.

      If the value is true or the value's function returns true, the modal will close when trying to dismiss. If the value is false or the value's function returns false, the modal will not close when trying to dismiss.
      
      This can be used to show an alert or action sheet, that prompts the user and asks if they are sure that they want to close the modal.
      `,
      defaultValue: 'true',
      type: ['(() => Promise<boolean>)', 'boolean'],
    },
    {
      name: 'title',
      description: `The title of the modal.`,
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'collapseTitle',
      description: `(Optional) If \`true\` will cause the title to initially be rendered as part of the content; Once scrolled out of view it collapses and appears in the header area. 
      \n Useful for long titles that would otherwise truncate.`,
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling in the modal.',
      type: ['boolean'],
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
      description: 'Emitted before the modal is dismissed.',
      signature: 'Promise<void>',
    },
    {
      name: 'didDismiss',
      description: 'Emitted after the modal is dismissed.',
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
      description: `(Optional) If true, the modal will be dismissed when the backdrop is clicked. It is still possible to use this property even if 'showBackdrop' is set to false, because the backdrop is still rendered, but have a transparent background.`,
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'showBackdrop',
      description: `(Optional) If true, a backdrop will be displayed behind the modal. This property controls whether or not the backdrop darkens the screen when the modal is presented. It does not control whether or not the backdrop is active or present in the DOM.`,
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
      description: `(Optional) If \`true\` will cause the title to initially be rendered as part of the content; Once scrolled out of view it collapses and appears in the header area. 
      \n Useful for long titles that would otherwise truncate. `,
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling in the modal',
      type: ['boolean'],
      defaultValue: 'false',
    },
  ];

  controllerMethods: ApiDescriptionMethod[] = [
    {
      name: 'showModal',
      description:
        'Generates and presents a modal. It takes a required argument of "ModalExperimentalConfig".',
      signature: `{
        onWillDismiss: Observable<OverlayEventDetail>;
        onDidDismiss: Observable<OverlayEventDetail>;
      }`,
    },
    {
      name: 'closeModal',
      description: `Closes the top-most modal. It takes two optional arguments: data & role.

        Data is the data you want to get out of the modal by subscribing to either "onWillDismiss" or "onDidDismiss" as described below. 

        Role is a string that is being returned as the second key in the response object from "onWillDismiss" and "onDidDismiss". This can be used to check if role === 'cancel' or 'confirm' (or other) and execute logic based on the result.
        `,
      signature: 'void',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }

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
    const config: ModalExperimentalConfig = {
      flavor: 'modal',
      component: ModalControllerExperimentalExampleComponent,
      componentProps: {
        title: 'Modal title',
      },
      canDismiss: enableCanDismiss ? this.canDismiss : undefined,
    };

    const modal = this.modalController.showModal(config);

    modal?.onWillDismiss.subscribe((response) => {
      const { role, data } = response;
      console.log('This is the role from the onWillDismiss subscription:', role);
      console.log('This is the data from the onWillDismiss subscription:', data);
    });

    modal?.onDidDismiss.subscribe((response) => {
      const { role, data } = response;
      console.log('This is the role from the onDidDismiss subscription:', role);
      console.log('This is the data from the onDidDismiss subscription:', data);
    });
  }
}
