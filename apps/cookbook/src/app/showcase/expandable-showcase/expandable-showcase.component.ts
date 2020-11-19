import { Component, OnInit } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-expandable-showcase',
  templateUrl: './expandable-showcase.component.html',
  styleUrls: ['./expandable-showcase.component.scss'],
})
export class ExpandableShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The title that you can click to show the content',
      defaultValue: 'null',
      inputValues: ['string'],
    },
  ];
}
