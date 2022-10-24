import { Component, EventEmitter, Output } from '@angular/core';

import exampleHtml from '../../examples/fonts-example/fonts-example.component.html?raw';

@Component({
  selector: 'cookbook-fonts-showcase',
  templateUrl: './fonts-showcase.component.html',
  styleUrls: ['./fonts-showcase.component.scss'],
})
export class FontsShowcaseComponent {
  exampleHtml = exampleHtml;

  @Output() isCTABoxShown = new EventEmitter();
}
