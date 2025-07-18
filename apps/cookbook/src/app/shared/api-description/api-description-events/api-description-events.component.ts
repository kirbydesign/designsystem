import { Component, Input } from '@angular/core';

export interface ApiDescriptionEvent {
  name: string;
  description?: string;
  signature?: string;
}

export interface ApiDescriptionEventColumns {
  name: string;
  description?: string;
  type?: string;
}

@Component({
  selector: 'cookbook-api-description-events',
  templateUrl: './api-description-events.component.html',
  styleUrls: ['../api-description.shared.scss'],
})
export class ApiDescriptionEventsComponent {
  @Input() events: ApiDescriptionEvent[];
  @Input() columns: ApiDescriptionEventColumns = {
    name: 'Name',
    description: 'Description',
    type: 'Signature',
  };
}
