import { Component, Input } from '@angular/core';

import { ShowcaseMethod, ShowcaseMethodColumns } from './showcase-method';

@Component({
  selector: 'cookbook-showcase-methods',
  templateUrl: './showcase-methods.component.html',
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
export class ShowcaseMethodsComponent {
  @Input() methods: ShowcaseMethod[];
  columns: ShowcaseMethodColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
