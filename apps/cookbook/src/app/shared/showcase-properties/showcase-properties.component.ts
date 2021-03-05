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
  selector: 'cookbook-showcase-properties',
  templateUrl: './showcase-properties.component.html',
  styleUrls: ['./showcase-properties.component.scss'],
})
export class ShowcasePropertiesComponent {
  @Input() properties: ShowcaseProperty[];
  @Input() columns: ShowcasePropertyColumns = {
    Name: 'Attribute',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };
}
