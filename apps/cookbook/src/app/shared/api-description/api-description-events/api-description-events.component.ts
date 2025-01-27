import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

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
  imports: [NgIf, NgFor],
})
export class ApiDescriptionEventsComponent {
  @Input() events: ApiDescriptionEvent[];
  @Input() columns: ApiDescriptionEventColumns = {
    name: 'Name',
    description: 'Description',
    type: 'Signature',
  };
}
