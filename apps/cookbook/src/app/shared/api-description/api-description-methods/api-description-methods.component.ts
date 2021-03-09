import { Component, Input } from '@angular/core';

export interface ShowcaseMethod {
  name: string;
  description?: string;
  signature?: string;
}

export interface ShowcaseMethodColumns {
  Name: string;
  Description?: string;
  Type?: string;
}

@Component({
  selector: 'cookbook-api-description-methods',
  templateUrl: './api-description-methods.component.html',
  styleUrls: ['../api-description.shared.scss'],
})
export class ApiDescriptionMethodsComponent {
  @Input() methods: ShowcaseMethod[];
  @Input() columns: ShowcaseMethodColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
