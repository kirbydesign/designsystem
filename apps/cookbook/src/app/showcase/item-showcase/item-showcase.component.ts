import { Component } from '@angular/core';

import {
  ShowcaseProperty,
  ShowcasePropertyColumns,
} from '../../shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-item-showcase',
  templateUrl: './item-showcase.component.html',
  styleUrls: ['./item-showcase.component.scss'],
})
export class ItemShowcaseComponent {
  columns: ShowcasePropertyColumns = {
    Name: 'Name',
    Description: 'Description',
  };

  properties: ShowcaseProperty[] = [
    {
      name: '--kirby-item-background',
      description: 'Background of the item',
    },
    {
      name: '--kirby-item-background-activated',
      description: 'Background of the item when pressed',
    },
    {
      name: '--kirby-item-background-focused',
      description: 'Background of the item when focused with the tab key',
    },
    {
      name: '--kirby-item-background-hover',
      description: 'Background of the item on hover',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
