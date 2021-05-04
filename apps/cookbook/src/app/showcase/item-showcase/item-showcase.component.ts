import { Component } from '@angular/core';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-item-showcase',
  templateUrl: './item-showcase.component.html',
  styleUrls: ['./item-showcase.component.scss'],
})
export class ItemShowcaseComponent {
  columns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  properties: ApiDescriptionProperty[] = [
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
