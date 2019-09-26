import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-page-showcase',
  templateUrl: './page-showcase.component.html',
  styleUrls: ['./page-showcase.component.scss'],
})
export class PageShowcaseComponent {
  exampleHtml: string = require('../../examples/page-example/page-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'checked',
      description: 'If true, the page is selected.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'disabled',
      description: 'If true, the page is disabled.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'checkedChange',
      description: 'Emits the checked state of the page on change (true | false).',
      defaultValue: '',
      inputValues: ['event'],
    },
  ];
}
