import { Component, OnInit } from '@angular/core';

import { ShowcaseProperty } from '../../shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-item-showcase',
  templateUrl: './item-showcase.component.html',
  styleUrls: ['./item-showcase.component.scss'],
})
export class ItemShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/item/item-example.component.html');

  properties: ShowcaseProperty[] = [];

  constructor() {}

  ngOnInit() {}
}
