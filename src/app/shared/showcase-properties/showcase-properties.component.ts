import { Component, Input } from '@angular/core';

import { ShowcaseProperty } from './showcase-property';

@Component({
  selector: 'kirby-showcase-properties',
  templateUrl: './showcase-properties.component.html',
})
export class ShowcasePropertiesComponent {
  @Input() properties: ShowcaseProperty[];
}
