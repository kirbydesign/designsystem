import { Component, Input } from '@angular/core';

import { ShowcaseMemberColumns } from '../showcase-member/showcase-member';

import { ShowcaseEvent } from './showcase-event';

@Component({
  selector: 'cookbook-showcase-events',
  templateUrl: './showcase-events.component.html',
  styleUrls: ['./showcase-events.component.scss'],
})
export class ShowcaseEventsComponent {
  @Input() events: ShowcaseEvent[];
  @Input() columns: ShowcaseMemberColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
