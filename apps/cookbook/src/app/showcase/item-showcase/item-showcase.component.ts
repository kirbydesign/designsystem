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
  properties: ApiDescriptionProperty[] = [
    {
      name: 'Selectable',
      description: 'Make item selectable',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'selected',
      description: 'Mark item as selected - making its content appear in bold',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'disabled',
      description: 'Disable item entirely including its contents',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'disclosure',
      description: 'Set disclosure icon',
      defaultValue: 'null',
      type: ["'link' | 'arrow-more' | 'arrow-down' | 'arrow-up' | null"],
    },
    {
      name: 'rotateIcon',
      description:
        'Rotates the disclosure icon 180 degrees. This only applies to the arrow-up & arrow-down icons',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'reorderable',
      description: 'Make item reorderable in a list - makes reorder icon appear',
      defaultValue: 'false',
      type: ['boolean'],
    },
    {
      name: 'size',
      description: 'Set size for item',
      defaultValue: 'md',
      type: ['ItemSize'],
    },
  ];

  customCssPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  customCssProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-item-background',
      description: 'Background of the item',
    },
    {
      name: '--kirby-item-background-focused',
      description: 'Background of the item when focused with the tab key',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
