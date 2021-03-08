import { Component, Input } from '@angular/core';

export interface ShowcaseEvent {
  name: string;
  description?: string;
  signature?: string;
}

export interface ShowcaseEventColumns {
  Name: string;
  Description?: string;
  Type?: string;
}

@Component({
  selector: 'cookbook-showcase-events',
  templateUrl: './showcase-events.component.html',
  styleUrls: ['../showcase-api-description/showcase-api-description.scss'],
})
export class ShowcaseEventsComponent {
  @Input() events: ShowcaseEvent[];
  @Input() columns: ShowcaseEventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
