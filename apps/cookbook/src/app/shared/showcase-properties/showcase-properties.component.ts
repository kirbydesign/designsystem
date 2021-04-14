import { Component, Input } from '@angular/core';

import { ShowcaseProperty, ShowCasePropertyColumns } from './showcase-property';

@Component({
  selector: 'cookbook-showcase-properties',
  templateUrl: './showcase-properties.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .description {
        white-space: pre-line;
      }
    `,
  ],
})
export class ShowcasePropertiesComponent {
  @Input() properties: ShowcaseProperty[];
  @Input() columns: ShowCasePropertyColumns = {
    Name: 'Attribute',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };
}
