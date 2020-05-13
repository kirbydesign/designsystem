import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cookbook-progress-circle-showcase',
  templateUrl: './progress-circle-showcase.component.html',
  styleUrls: ['./progress-circle-showcase.component.scss'],
})
export class ProgressCircleShowcaseComponent implements OnInit {
  exampleHtml: string = `
      HTML for Progress Circle example
    `;
  constructor() {}

  ngOnInit() {}
}
