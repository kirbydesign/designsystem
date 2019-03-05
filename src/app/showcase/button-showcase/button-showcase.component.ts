import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/button-example/button-example.component.html');

  constructor() {}

  ngOnInit() {}
}
