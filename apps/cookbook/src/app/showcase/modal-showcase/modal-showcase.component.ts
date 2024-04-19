import { Component } from '@angular/core';
import { ModalExampleAdvancedComponent } from '~/app/examples/modal-example/modal-example-advanced.component';
import { ModalExampleOutletComponent } from '~/app/examples/modal-example/modal-example-outlet.component';
import { ModalExampleSimpleComponent } from '~/app/examples/modal-example/modal-example-simple.component';
import { ModalExampleAlertComponent } from '~/app/examples/modal-example/modal-example-alert.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ModalEmbeddedAlertExampleComponent } from '~/app/examples/modal-example/alert-example/modal-example-embedded-alert.component';
import { ModalComponentExampleComponent } from '~/app/examples/modal-example/modal-component-example.component';

@Component({
  selector: 'cookbook-modal-showcase',
  templateUrl: './modal-showcase.component.html',
  styleUrls: ['./modal-showcase.component.scss'],
  preserveWhitespaces: true,
})
export class ModalShowcaseComponent {
  advancedConfigExample = ModalExampleAdvancedComponent;
  basicConfigExample = ModalExampleSimpleComponent;
  componentExample = ModalComponentExampleComponent;
  outletExample = ModalExampleOutletComponent;
  alertEmbeddedExample = ModalEmbeddedAlertExampleComponent;
  alertModalConfigExample = ModalExampleAlertComponent;
  isOpenExampleHtml = ModalComponentExampleComponent.isOpenExampleHtml;
  isOpenCodeSnippet = ModalComponentExampleComponent.isOpenCodeSnippet;

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }

  configProperties: ApiDescriptionProperty[] = [
    {
      name: 'flavor',
      description: `(Optional) The flavor of the modal.
      
      With the \`modal\` flavor the dialog is presented directly on top of content, either as a full screen modal on small screens or centered on the page on larger screens.

      Modals with a \`drawer\` flavor appears as a sheet on top of page content on small screens, and adapts its height to fit its content. On
      larger screens the drawer is identical to the modal.
      
      Modals with a \`compact\` flavor simply render the specified component, similar to alerts.
      **Please note: As there is no toolbar or close button, you should handle closing the modal yourself.`,
      defaultValue: 'modal',
      type: ['undefined', 'modal', 'drawer', 'compact'],
    },
    {
      name: 'collapseTitle',
      description: `(Optional) If \`true\` will cause the title to initially be rendered as part of the content; once scrolled out of view it collapses and appears in the header area. 
      \n Useful for long titles that would otherwise truncate. `,
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'size',
      description: `(Optional) Defines the dialog width and height on larger screens. On small screens the dialog is always full-screen.`,
      defaultValue: 'medium',
      type: ['undefined', 'small', 'medium', 'large', 'full-height'],
    },
    {
      name: 'customHeight',
      description: `(Optional) Setting a customHeight overrides the height set by the size property on larger screens. Can be used with any string that is a valid value for the CSS height property. \n\n See: https://developer.mozilla.org/en-US/docs/Web/CSS/height `,
      defaultValue: 'undefined',
      type: ['undefined | string'],
    },
    {
      name: 'drawerSupplementaryAction',
      description: `(Optional) Allows placing a supplementary button in the top right corner of drawers.
      Please note: Only available on modals with a \`drawer\` flavor.`,
      defaultValue: '',
      type: ['{iconName: string, action: Function}'],
    },
    {
      name: 'interactWithBackground',
      description: `(Optional) Removes backdrop and allows interaction with the background.
      Please note: Only available on modals with a \`drawer\` flavor.`,
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'canDismiss',
      description: `(Optional) Determines whether or not a modal can be dismissed.
 
      The canDismiss option takes a callback function that returns either a boolean or an AlertConfig. If an AlertConfig is returned an alert will appear when the user tries to dismiss the modal. If false is returned the modal cannot be dismissed by user-interaction or with ModalController.hideTopMost(). `,
      defaultValue: 'true',
      type: ['boolean | AlertConfig | Promise<boolean | AlertConfig>'],
    },
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling of the modal',
      type: ['true', 'false'],
      defaultValue: 'false',
    },
  ];

  modalConfigProperties: ApiDescriptionProperty[] = [
    {
      name: 'component',
      description: '(Required) The component which will be rendered inside the modal.',
      defaultValue: '',
      type: ['Component'],
    },
    {
      name: 'componentProps',
      description: '(Optional) The data to pass to the modal component.',
      defaultValue: '',
      type: ['undefined | { [key: string]: any; }'],
    },
    {
      name: 'cssClass',
      description: `(Optional) Adds custom css classes to the modal. This allows for custom styling of the modal (see 'CSS Custom Properties' section).`,
      defaultValue: '',
      type: ['string | string[]'],
    },
  ];

  footerProperties: ApiDescriptionProperty[] = [
    {
      name: 'themeColor',
      description: "Theme color. 'light' will use the background-color variable",
      type: ['white', 'light'],
      defaultValue: 'white',
    },
    {
      name: 'type',
      description:
        'Sets the type of the footer. When inline the footer will have a transparent background and no shadow.',
      type: ['fixed', 'inline'],
      defaultValue: 'fixed',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'didPresent',
      description: 'Emitted when the modal is ready and the enter animation has finished',
      signature: 'Promise<void>',
    },
    {
      name: 'willClose',
      description: 'Emitted when the user closes the modal or modal.close() method is called',
      signature: 'Promise<void>',
    },
  ];

  cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };
  cssCustomProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-modal-color',
      description: 'Color of the modal.',
    },
    {
      name: '--kirby-modal-background',
      description: 'Background of the modal.',
    },
  ];
}
