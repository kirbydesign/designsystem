import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionMethod } from '~/app/shared/api-description/api-description-methods/api-description-methods.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

declare var require: any;

@Component({
  selector: 'cookbook-action-sheet-showcase',
  templateUrl: './action-sheet-showcase.component.html',
  styleUrls: ['./action-sheet-showcase.component.scss'],
  preserveWhitespaces: true,
})
export class ActionSheetShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'header',
      description: '(Optional) The header of the action sheet',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'subheader',
      description: '(Optional) The subheader of the action sheet',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'items',
      description: 'The options shown inside the action sheet',
      defaultValue: '',
      type: ['Array<ActionSheetItem>'],
    },
    {
      name: 'cancelButtonText',
      description: '(Optional) The text for the cancel button.',
      defaultValue: 'Cancel',
      type: ['string'],
    },
    {
      name: 'hideCancel',
      description: '(Optional) Hide or show the cancel button.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'iconName',
      description: '(Optional) The icon key for the trigger button.',
      defaultValue: 'more',
      type: ['string'],
    },
    {
      name: 'buttonText',
      description: '(Optional) The text for the trigger button.',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'disabled',
      description: '(Optional) Sets the disabled state of the component.',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'hideButton',
      description: '(Optional) Hides the trigger button.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];

  methods: ApiDescriptionMethod[] = [
    {
      name: 'toggle()',
      description: 'Toggles the open/closed state of the sheet.',
      signature: '() => void',
    },
    {
      name: 'open()',
      description: 'Opens the sheet.',
      signature: '() => void',
    },
    {
      name: 'close()',
      description: 'Closes the sheet.',
      signature: '() => void',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'itemSelect',
      description: 'Emitted when an item is selected (tap on mobile, click/keypress on web)',
      signature: '() => ActionSheetItem',
    },
  ];
}
