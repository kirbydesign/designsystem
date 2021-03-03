import { Component, Input } from '@angular/core';

import { ShowcaseMemberColumns } from '../showcase-member/showcase-member';

import { ShowcaseMethod } from './showcase-method';

@Component({
  selector: 'cookbook-showcase-methods',
  templateUrl: './showcase-methods.component.html',
  styleUrls: ['./showcase-methods.component.scss'],
})
export class ShowcaseMethodsComponent {
  @Input() methods: ShowcaseMethod[];
  @Input() columns: ShowcaseMemberColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Signature',
  };
}
