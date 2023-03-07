import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

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
      name: 'themeColor',
      description: 'Color of the default button',
      defaultValue: 'dark',
      type: ['ThemeColor'],
    },
    {
      name: 'iconSize',
      description: 'Size of the default button',
      defaultValue: 'sm',
      type: ['IconSize'],
    },
    {
      name: 'buttonSize',
      description: 'size of the default button',
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
      description: `Defines how the button should interact with the content. A value of 'click' will make the content appear/hide on click of the button`,
      defaultValue: 'click',
      type: ['Array<TriggerEvent>'],
    },
    {
      name: 'autoPlacement',
      description:
        'If the menu should attempt to position the content where there is best room for it. Might disregard value of input placement',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'closeOnSelect',
      description: 'If the menu should hide content after selecting (clicking) on the content',
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
  ];
}
