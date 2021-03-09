import { Component } from '@angular/core';
import { ShowcaseEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import {
  ShowcaseProperty,
  ShowcasePropertyColumns,
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

  propertyColumns: ShowcasePropertyColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Input values',
    Default: 'Default',
  };

  properties: ShowcaseProperty[] = [
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

  events: ShowcaseEvent[] = [
    { name: 'back', description: 'Emits a click/tap event for the back navigation button' },
    { name: 'primarySelect', description: 'Emits a click/tap event for the primary element' },
    { name: 'secondarySelect', description: 'Emits a click/tap event for the secondary element' },
  ];
}
