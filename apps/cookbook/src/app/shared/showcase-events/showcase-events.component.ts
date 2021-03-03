import { Component, Input } from '@angular/core';

import { ShowcaseEvent, ShowcaseEventColumns } from './showcase-event';

@Component({
  selector: 'cookbook-showcase-events',
  templateUrl: './showcase-events.component.html',
  styleUrls: ['./showcase-events.component.scss'],
})
export class ShowcaseEventsComponent {
  @Input() events: ShowcaseEvent[];
  @Input() columns: ShowcaseEventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
