import { Component, Input } from '@angular/core';

export interface ApiDescriptionProperty {
  name: string;
  description?: string;
  defaultValue?: string;
  inputValues?: string[];
  preserveInputValuesWhitespaces?: boolean;
}

export interface ApiDescriptionPropertyColumns {
  Name: string;
  Description?: string;
  Type?: string;
  Default?: string;
}

@Component({
  selector: 'cookbook-api-description-properties',
  templateUrl: './api-description-properties.component.html',
  styleUrls: ['../api-description.shared.scss'],
})
export class ApiDescriptionPropertiesComponent {
  @Input() properties: ApiDescriptionProperty[];
  @Input() columns: ApiDescriptionPropertyColumns = {
    Name: 'Attribute',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };
}
