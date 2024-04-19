import { Component } from '@angular/core';
import {
  portalOutletConfigExampleHTML,
  portalOutletConfigExampleTS,
} from '../../examples/menu-example/examples/portalOutletConfig';
import { ApiDescriptionProperty } from './../../shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-menu-showcase',
  templateUrl: './menu-showcase.component.html',
  styleUrls: ['./menu-showcase.component.scss'],
})
export class MenuShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'isDisabled',
      description:
        'Disable the default button from being clickable and prevents content from changing display state',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'buttonSize',
      description: 'Size of the default button',
      defaultValue: 'md',
      type: ['ButtonSize'],
    },
    {
      name: 'placement',
      description: 'Placement of the content when displayed',
      defaultValue: 'bottom-start',
      type: ['Placement'],
    },
    {
      name: 'triggers',
      description:
        'Defines how the button should interact with the content. A value of `click` will make the content appear/hide on click of the button',
      defaultValue: 'click',
      type: ['Array<TriggerEvent>'],
    },
    {
      name: 'autoPlacement',
      description:
        'If content should be auto placed where it best fits on the screen. Will override value of input placement',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'attentionLevel',
      description: 'AttentionLevel for the menu button',
      defaultValue: '3',
      type: ['AttentionLevel'],
    },
    {
      name: 'DOMPortalOutlet',
      description:
        "HTMLElement for which the menu content should be placed under as a child. By default the menu content is appended to `document.body`. If set to `null`, the content will appear at it's normal place in the DOM",
      defaultValue: 'document.body',
      type: ['HTMLElement'],
    },
    {
      name: 'portalOutletConfig',
      description:
        'Defines how to automatically find and assign DOMPortalOutlet if none is provided in DOMPortalOutlet. If nothing is provided here and in DOMPortalOutlet, the provided strategy is used',
      defaultValue: 'N/A',
      type: ['PortalOutletConfig'],
    },
    {
      name: 'closeOnSelect',
      description: 'Toggle whether the menu should hide the content after selecting the content',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'closeOnEscapeKey',
      description: 'If the menu should hide content after pressing escape',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'closeOnBackdrop',
      description: 'If the menu should hide content after clicking outside of content',
      defaultValue: 'true',
      type: ['boolean'],
    },
    {
      name: 'minWidth',
      description: 'The minimum width of the menu. If not set, the default width is 240px',
      defaultValue: 'N/A',
      type: ['number'],
    },
  ];

  public isOutletElementSet: boolean = true;

  portalOutletConfigExampleHTML: string = portalOutletConfigExampleHTML;
  portalOutletConfigExampleTS: string = portalOutletConfigExampleTS;

  public onCheckedChange(checked: boolean) {
    this.isOutletElementSet = checked;
  }

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
