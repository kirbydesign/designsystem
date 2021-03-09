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
  selector: 'cookbook-showcase-methods',
  templateUrl: './showcase-methods.component.html',
  styleUrls: ['../api-description/api-description.shared.scss'],
})
export class ShowcaseMethodsComponent {
  @Input() methods: ShowcaseMethod[];
  @Input() columns: ShowcaseMethodColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
