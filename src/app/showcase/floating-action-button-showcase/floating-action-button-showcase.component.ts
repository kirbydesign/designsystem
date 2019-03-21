import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-floating-action-button-showcase',
  templateUrl: './floating-action-button-showcase.component.html',
  styleUrls: ['./floating-action-button-showcase.component.scss']
})
export class FloatingActionButtonShowcaseComponent implements OnInit {

  exampleHtml: string = require('../../examples/floating-action-button-example/floating-action-button-example.component.html');

  constructor() { }

  ngOnInit() {
  }

}
