import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-loading-showcase',
  templateUrl: './loading-showcase.component.html',
})
export class LoadingShowcaseComponent {
  exampleHtml: string = require('../../examples/loading-example/loading-example.component.html');
  properties: ShowcaseProperty[] = [];
}
