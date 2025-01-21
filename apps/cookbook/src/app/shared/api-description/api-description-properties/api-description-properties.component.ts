import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ApiDescriptionProperty {
  name: string;
  description?: string;
  defaultValue?: string;
  type?: string[];
  preserveTypeWhitespaces?: boolean;
}

export interface ApiDescriptionPropertyColumns {
  name: string;
  description?: string;
  type?: string;
  default?: string;
}

@Component({
  selector: 'cookbook-api-description-properties',
  templateUrl: './api-description-properties.component.html',
  styleUrls: ['../api-description.shared.scss'],
  imports: [NgIf, NgFor],
})
export class ApiDescriptionPropertiesComponent {
  @Input() properties: ApiDescriptionProperty[];
  @Input() columns: ApiDescriptionPropertyColumns = {
    name: 'Attribute',
    description: 'Description',
    type: 'Type',
    default: 'Default',
  };
}
