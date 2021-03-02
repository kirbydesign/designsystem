import { Component, Input } from '@angular/core';

import { ShowcaseMemberColumns } from '../showcase-member/showcase-member';

import { ShowcaseMethod } from './showcase-method';

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
  columns: ShowcaseMemberColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
