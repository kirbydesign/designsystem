import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-toolbar-showcase',
  templateUrl: './toolbar-showcase.component.html',
  styleUrls: ['./toolbar-showcase.component.css'],
})
export class ToolbarShowcaseComponent implements OnInit {
  exampleHtml: string = require('../../examples/toolbar-example/toolbar-example.component.html');
  constructor() {}

  ngOnInit() {}
}
