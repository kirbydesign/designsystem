import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-card-showcase',
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss']
})
export class CardShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/card-example/card-example.component.html');

  constructor() {
  }

  ngOnInit() {
  }
}
