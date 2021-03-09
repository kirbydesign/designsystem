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
  styleUrls: ['../api-description/api-description.shared.scss'],
})
export class ShowcaseEventsComponent {
  @Input() events: ShowcaseEvent[];
  @Input() columns: ShowcaseEventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
