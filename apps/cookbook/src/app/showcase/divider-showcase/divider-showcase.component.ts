import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import exampleHtml from '../../examples/divider-example/divider-example.component.html?raw';
import { DividerExampleComponent } from '../../examples/divider-example/divider-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-divider-showcase',
  templateUrl: './divider-showcase.component.html',
  imports: [DividerExampleComponent, FormsModule, NgFor, CodeViewerComponent],
})
export class DividerShowcaseComponent {
  themeColors = ['white', 'light'];
  themeColor = 'white';
  hasMargin = false;

  exampleHtml = exampleHtml;

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }

  onMarginChange(hasMargin) {
    this.hasMargin = hasMargin;
  }
}
