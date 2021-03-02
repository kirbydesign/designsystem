import { Component, Input } from '@angular/core';

import { ShowcaseEvent, ShowcaseEventColumns } from './showcase-event';

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
  columns: ShowcaseEventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
