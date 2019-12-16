import { Component } from '@angular/core';

import { ShowcaseProperty } from '../../shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-item-showcase',
  templateUrl: './item-showcase.component.html',
  styleUrls: ['./item-showcase.component.scss'],
})
export class ItemShowcaseComponent {
  properties: ShowcaseProperty[] = [];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
