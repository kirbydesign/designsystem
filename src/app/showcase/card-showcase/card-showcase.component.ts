import { Component, OnInit, AfterViewChecked } from '@angular/core';
import Prism from 'prismjs';

declare var require: any;
const exampleHtml = require('../../examples/card-example/card-example.component.html');

@Component({
  selector: 'kirby-card-showcase',
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss']
})
export class CardShowcaseComponent implements OnInit, AfterViewChecked {
  exampleHtml: string;

  constructor() {
    this.exampleHtml = exampleHtml;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    Prism.highlightAll();
  }

}
