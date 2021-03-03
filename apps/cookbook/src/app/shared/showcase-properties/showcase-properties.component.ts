import { Component, Input } from '@angular/core';

import { ShowcaseMemberColumns } from '../showcase-member/showcase-member';

import { ShowcaseProperty } from './showcase-property';

@Component({
  selector: 'cookbook-showcase-properties',
  templateUrl: './showcase-properties.component.html',
  styleUrls: ['./showcase-properties.component.scss'],
})
export class ShowcasePropertiesComponent {
  @Input() properties: ShowcaseProperty[];
  @Input() columns: ShowcaseMemberColumns = {
    Name: 'Attribute',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };
}
