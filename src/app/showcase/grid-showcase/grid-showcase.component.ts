import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-grid-showcase',
  templateUrl: './grid-showcase.component.html',
  styleUrls: ['./grid-showcase.component.scss']
})
export class GridShowcaseComponent implements OnInit {

  exampleHtml: string = require('../../examples/grid-example/grid-example.component.html');

  constructor() { }

  ngOnInit() {
  }

}
