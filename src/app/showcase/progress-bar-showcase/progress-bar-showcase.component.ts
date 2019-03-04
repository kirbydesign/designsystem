import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-progress-bar-showcase',
  templateUrl: './progress-bar-showcase.component.html',
  styleUrls: ['./progress-bar-showcase.component.scss']
})
export class ProgressBarShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/progress-bar-example/progress-bar-example.component.html');
  constructor() { }

  ngOnInit() {
  }

}
