import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-toolbar-showcase',
  templateUrl: './toolbar-showcase.component.html',
  styleUrls: ['./toolbar-showcase.component.scss'],
})
export class ToolbarShowcaseComponent {
  exampleHtml: string = `
      <!-- title -->
      <kirby-toolbar title="TITLE"></kirby-toolbar>
      <!-- back button -->
      <kirby-toolbar hideBackButton="false" (back)="onBackButtonSelect()"></kirby-toolbar>
      <!-- primary and secondary elements -->
      <kirby-toolbar (primarySelect)="foo()" (secondarySelect)="bar()">
        <kirby-icon primary size="md" name="search"></kirby-icon>
        <kirby-icon secondary size="md" name="more"></kirby-icon>
      </kirby-toolbar>
    `;

  propertyColumns: ApiDescriptionPropertyColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Input values',
    Default: 'Default',
  };

  properties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: 'Sets the title in the toolbar',
      inputValues: ['string'],
    },
    {
      name: 'hideBackButton',
      description: 'Specifies if the backbutton should be hidden',
      inputValues: ['boolean'],
      defaultValue: 'false',
    },
  ];

  events: ApiDescriptionEvent[] = [
    { name: 'back', description: 'Emits a click/tap event for the back navigation button' },
    { name: 'primarySelect', description: 'Emits a click/tap event for the primary element' },
    { name: 'secondarySelect', description: 'Emits a click/tap event for the secondary element' },
  ];
}
