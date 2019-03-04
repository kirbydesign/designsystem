import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-spinner-showcase',
  templateUrl: './spinner-showcase.component.html',
  styleUrls: ['./spinner-showcase.component.scss'],
})
export class SpinnerShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/spinner-example/spinner-example.component.html');

  constructor() {}

  ngOnInit() {}
}
