import { Component, OnInit } from '@angular/core';
declare var require: any;
@Component({
  selector: 'kirby-badge-showcase',
  templateUrl: './badge-showcase.component.html',
  styleUrls: ['./badge-showcase.component.scss'],
})
export class BadgeShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/badge-example/badge-example.component.html');

  constructor() {}

  ngOnInit() {}
}
