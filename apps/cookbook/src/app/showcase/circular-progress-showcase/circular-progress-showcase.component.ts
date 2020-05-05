import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cookbook-circular-progress-showcase',
  templateUrl: './circular-progress-showcase.component.html',
  styleUrls: ['./circular-progress-showcase.component.scss'],
})
export class CircularProgressShowcaseComponent implements OnInit {
  exampleHtml: string = `
      HTML for Circular Progress example
    `;
  constructor() {}

  ngOnInit() {}
}
