import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-dropdown-showcase',
  templateUrl: './dropdown-showcase.component.html',
  styleUrls: ['./dropdown-showcase.component.scss'],
})
export class DropdownShowcaseComponent {
  exampleHtml: string = require('!raw-loader!../../examples/dropdown-example/dropdown-example.component.html')
    .default;
  properties: ShowcaseProperty[] = [];
  constructor() {}
}
