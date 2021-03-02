import { Component, Input } from '@angular/core';

import { ShowcaseMemberColumns } from '../showcase-member/showcase-member';

import { ShowcaseEvent } from './showcase-event';

@Component({
  selector: 'cookbook-showcase-events',
  templateUrl: './showcase-events.component.html',
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
export class ShowcaseEventsComponent {
  @Input() events: ShowcaseEvent[];
  columns: ShowcaseMemberColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
