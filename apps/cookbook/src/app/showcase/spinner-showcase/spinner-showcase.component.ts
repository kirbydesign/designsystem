import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cookbook-spinner-showcase',
  templateUrl: './spinner-showcase.component.html',
  styleUrls: ['./spinner-showcase.component.scss'],
})
export class SpinnerShowcaseComponent implements OnInit {
  exampleHtml: string =
    require('!raw-loader!../../examples/spinner-example/spinner-example.component.html').default;

  constructor() {}

  ngOnInit() {}
}
