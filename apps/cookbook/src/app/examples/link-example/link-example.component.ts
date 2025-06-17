import { Component } from '@angular/core';
import { LinkExampleDefaultComponent } from './examples/default';
import { LinkExampleNewTabComponent } from './examples/new-tab';

@Component({
  selector: 'cookbook-link-example',
  templateUrl: './link-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [LinkExampleDefaultComponent, LinkExampleNewTabComponent],
})
export class LinkExampleComponent {}
