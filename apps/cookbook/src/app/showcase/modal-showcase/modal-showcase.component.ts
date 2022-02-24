import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

import { ModalController } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-modal-showcase',
  templateUrl: './modal-showcase.component.html',
  styleUrls: ['./modal-showcase.component.scss'],
  preserveWhitespaces: true,
})
export class ModalShowcaseComponent implements AfterViewInit {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private modalController: ModalController
  ) {}

  ngAfterViewInit(): void {
    this.modalController.registerPresentingElement(
      this.elementRef.nativeElement.closest('cookbook-home')
    );
  }

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }

  configProperties: ApiDescriptionProperty[] = [
    {
      name: 'flavor',
      description: `(Optional) The flavor of the modal.
      
      Modals with \`modal\` flavor have a close button placed in the top right corner and are full-screen on small screens.
      
      Modals with a \`drawer\` flavor slide-up/down and have a arrow-down button placed in the top left corner.
      
      Modals with a \`compact\` flavor simply render the specified component, similar to alerts.
      Please note: As there is no toolbar or close button, you should handle closing the modal yourself.`,
      defaultValue: 'modal',
      type: ['undefined', 'modal', 'drawer', 'compact'],
    },
    {
      name: 'size',
      description: `(Optional) The initial size of the modal before content is loaded.
        The \`full-height\` option will take up as much vertical space as possible and not resize with content or native keyboard.`,
      defaultValue: 'medium (modal) | small (drawer)',
      type: ['undefined', 'small', 'medium', 'large', 'full-height'],
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
      defaultValue: '',
      type: ['undefined | { [key: string]: any; }'],
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
      name: 'cssClass',
      description: `(Optional) Adds custom css classes to the modal. This allows for custom styling of the modal (see 'CSS Custom Properties' section).`,
      defaultValue: '',
      type: ['string | string[]'],
    },
  ];

  properties: ApiDescriptionProperty[] = [
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling of the modal',
      type: ['true', 'false'],
      defaultValue: 'false',
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
