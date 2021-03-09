import { Component, Input } from '@angular/core';

export interface ShowcaseProperty {
  name: string;
  description?: string;
  defaultValue?: string;
  inputValues?: string[];
  preserveInputValuesWhitespaces?: boolean;
}

export interface ShowcasePropertyColumns {
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
  @Input() properties: ShowcaseProperty[];
  @Input() columns: ShowcasePropertyColumns = {
    Name: 'Attribute',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };
}
