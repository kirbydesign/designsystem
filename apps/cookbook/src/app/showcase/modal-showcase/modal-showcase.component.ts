import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {
  defaultEventColumns,
  ShowcaseEvent,
  ShowcaseEventColumns,
} from '~/app/shared/showcase-events/showcase-event';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

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

  configProperties: ShowcaseProperty[] = [
    {
      name: 'flavor',
      description: `(Optional) The flavor of the modal.
      
      Modals with \`modal\` flavor have a close button placed in the top right corner and are full-screen on small screens.
      
      Modals with a \`drawer\` flavor slide-up/down and have a arrow-down button placed in the top left corner.
      
      Modals with a \`compact\` flavor simply render the specified component, similar to alerts.
      Please note: As there is no toolbar or close button, you should handle closing the modal yourself.`,
      defaultValue: 'modal',
      inputValues: ['undefined', 'modal', 'drawer', 'compact'],
    },
    {
      name: 'size',
      description: `(Optional) The initial size of the modal before content is loaded.
        The \`full-height\` option will take up as much vertical space as possible and not resize with content or native keyboard.`,
      defaultValue: 'medium (modal) | small (drawer)',
      inputValues: ['undefined', 'small', 'medium', 'large', 'full-height'],
    },
    {
      name: 'component',
      description: 'The component which will be rendered inside the modal.',
      defaultValue: '',
      inputValues: ['Component'],
    },
    {
      name: 'componentProps',
      description: '(Optional) The data to pass to the modal component.',
      defaultValue: '',
      inputValues: ['undefined | { [key: string]: any; }'],
    },
    {
      name: 'drawerSupplementaryAction',
      description: `(Optional) Allows placing a supplementary button in the top right corner of drawers.
      Please note: Only available on modals with a \`drawer\` flavor.`,
      defaultValue: '',
      inputValues: ['{iconName: string, action: Function}'],
    },
  ];

  properties: ShowcaseProperty[] = [
    {
      name: 'scrollDisabled',
      description: 'Disable scrolling of the modal',
      inputValues: ['true', 'false'],
      defaultValue: 'false',
    },
  ];

  footerProperties: ShowcaseProperty[] = [
    {
      name: 'themeColor',
      description: "Theme color. 'light' will use the background-color variable",
      inputValues: ['white', 'light'],
      defaultValue: 'white',
    },
  ];

  events: ShowcaseEvent[] = [
    {
      name: 'didPresent',
      description: 'Emitted when the modal is ready and the enter animation has finished',
      inputValues: ['Promise<void>'],
    },
    {
      name: 'willClose',
      description: 'Emitted when the user closes the modal or modal.close() method is called',
      inputValues: ['Promise<void>'],
    },
  ];

  eventColumns: ShowcaseEventColumns = defaultEventColumns;
}
