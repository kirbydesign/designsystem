import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-checkbox-showcase',
  templateUrl: './checkbox-showcase.component.html',
  styleUrls: ['./checkbox-showcase.component.scss']
})
export class CheckboxShowcaseComponent implements OnInit {

  exampleHtml: string = require('../../examples/checkbox-example/checkbox-example.component.html');

  constructor() { }

  ngOnInit() {
  }

}
