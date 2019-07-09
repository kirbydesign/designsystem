import { Component } from '@angular/core';
declare var require: any;

@Component({
  selector: 'kirby-empty-state-showcase',
  templateUrl: './empty-state-showcase.component.html',
  styleUrls: ['./empty-state-showcase.component.scss'],
})
export class EmptyStateShowcaseComponent {
  exampleHtml: string = require('../../examples/empty-state-example/empty-state-example.component.html');
}
