import { Component, Input } from '@angular/core';

import { ShowcaseProperty } from './showcase-property';

@Component({
  selector: 'kirby-showcase-properties',
  templateUrl: './showcase-properties.component.html',
  styles: [':host { display: block; }'],
})
export class ShowcasePropertiesComponent {
  @Input() properties: ShowcaseProperty[];
  @Input() columns: {
    Name?: string;
    Description?: string;
    Type?: string;
    Default?: string;
  } = {
    Name: 'Attribute',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };
}
