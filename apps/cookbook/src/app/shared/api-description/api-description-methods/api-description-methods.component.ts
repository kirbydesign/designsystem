import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface ApiDescriptionMethod {
  name: string;
  description?: string;
  signature?: string;
}

export interface ApiDescriptionMethodColumns {
  name: string;
  description?: string;
  type?: string;
}

@Component({
  selector: 'cookbook-api-description-methods',
  templateUrl: './api-description-methods.component.html',
  styleUrls: ['../api-description.shared.scss'],
  imports: [NgIf, NgFor],
})
export class ApiDescriptionMethodsComponent {
  @Input() methods: ApiDescriptionMethod[];
  @Input() columns: ApiDescriptionMethodColumns = {
    name: 'Name',
    description: 'Description',
    type: 'Signature',
  };
}
