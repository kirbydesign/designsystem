import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var require;

@Component({
  selector: 'kirby-fonts-showcase',
  templateUrl: './fonts-showcase.component.html',
  styleUrls: ['./fonts-showcase.component.scss']
})
export class FontsShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/fonts-example/fonts-example.component.html');

  @Output() isCTABoxShown = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
