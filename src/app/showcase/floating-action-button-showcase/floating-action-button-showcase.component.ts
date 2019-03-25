import { Component, OnInit } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-floating-action-button-showcase',
  templateUrl: './floating-action-button-showcase.component.html',
  styleUrls: ['./floating-action-button-showcase.component.scss'],
})
export class FloatingActionButtonShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/floating-action-button-example/floating-action-button-example.component.html');

  properties: ShowcaseProperty[] = [
    <ShowcaseProperty>{
      name: 'hasShadow',
      description: 'Determines whether the button will have a shadow or not.',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
    <ShowcaseProperty>{
      name: 'disabled',
      description: 'Determines whether the button will be disabled or not.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    <ShowcaseProperty>{
      name: 'iconSrc',
      description: 'Points to the source of the icon, which will be used.',
      defaultValue: `'/assets/icons/add/add@3x.png'`,
      inputValues: ['string'],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
