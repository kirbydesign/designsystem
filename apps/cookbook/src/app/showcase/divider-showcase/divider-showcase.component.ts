import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

// @ts-expect-error TypeScript cannot provide types based on attributes yet
import exampleHtml from '../../examples/divider-example/divider-example.component.html' with { loader: 'text' };
import { DividerExampleComponent } from '../../examples/divider-example/divider-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';

@Component({
  selector: 'cookbook-divider-showcase',
  templateUrl: './divider-showcase.component.html',
  imports: [DividerExampleComponent, FormsModule, CodeViewerComponent, ImportViewerComponent],
})
export class DividerShowcaseComponent {
  themeColors = ['white', 'light', 'dark'];
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
