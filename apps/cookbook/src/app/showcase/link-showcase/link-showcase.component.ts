import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { LinkExampleDefaultComponent } from '../../examples/link-example/examples/default';
import { LinkExampleNewTabComponent } from '../../examples/link-example/examples/new-tab';
import { LinkExampleTrailingIconComponent } from '../../examples/link-example/examples/trailing-icon';

@Component({
  selector: 'cookbook-link-showcase',
  templateUrl: './link-showcase.component.html',
  styleUrls: ['../_showcase.shared.scss'],
  imports: [
    RouterLink,
    ExampleViewerComponent,
    LinkExampleDefaultComponent,
    LinkExampleNewTabComponent,
    LinkExampleTrailingIconComponent,
  ],
})
export class LinkShowcaseComponent {}
