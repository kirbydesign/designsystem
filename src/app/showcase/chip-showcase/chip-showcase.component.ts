import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-chip-showcase',
  templateUrl: './chip-showcase.component.html',
  styleUrls: ['./chip-showcase.component.scss'],
})
export class ChipShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/chip-example/chip-example.component.html');

  constructor() {}

  ngOnInit() {}
}
