import { Component } from '@angular/core';
import { StylingHtmlListsExampleComponent } from '../../examples/styling-html-lists-example/styling-html-lists-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-styling-list-showcase',
  templateUrl: './styling-html-lists-showcase.html',
  styleUrls: ['../_showcase.shared.scss'],
  imports: [StylingHtmlListsExampleComponent, CodeViewerComponent],
})
export class StylingHtmlListsShowcaseComponent {}
