import { Component, Input } from '@angular/core';

import { ShowcaseMethod, ShowcaseMethodColumns } from './showcase-method';

@Component({
  selector: 'cookbook-showcase-methods',
  templateUrl: './showcase-methods.component.html',
  styleUrls: ['./showcase-methods.component.scss'],
})
export class ShowcaseMethodsComponent {
  @Input() methods: ShowcaseMethod[];
  @Input() columns: ShowcaseMethodColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
