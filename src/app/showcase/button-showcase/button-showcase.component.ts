import { Component, OnInit } from '@angular/core';
declare var require: any;

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/button-example/button-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      inputValues: ['block'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the button should use from the theme palette.',
      defaultValue: 'primary',
      inputValues: ['primary', 'secondary'],
    },
    {
      name: 'size',
      description: 'Sets the size of the button.',
      defaultValue: 'md',
      inputValues: ['sm', 'md', 'lg'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
