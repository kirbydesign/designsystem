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
  selector: 'cookbook-api-description-events',
  templateUrl: './api-description-events.component.html',
  styleUrls: ['../api-description.shared.scss'],
})
export class ApiDescriptionEventsComponent {
  @Input() events: ShowcaseEvent[];
  @Input() columns: ShowcaseEventColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
