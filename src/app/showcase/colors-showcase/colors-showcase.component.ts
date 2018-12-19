import { Component, OnInit } from '@angular/core';
const style = require('sass-extract-loader!./colors-showcase.component.scss');

@Component({
  selector: 'kirby-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss']
})
export class ColorsShowcaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
