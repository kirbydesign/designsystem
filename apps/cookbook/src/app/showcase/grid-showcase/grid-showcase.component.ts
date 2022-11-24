import { Component } from '@angular/core';
import exampleHtml from '../../examples/grid-example/grid-example.component.html?raw';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-grid-showcase',
  templateUrl: './grid-showcase.component.html',
})
export class GridShowcaseComponent {
  exampleHtml = exampleHtml;
  gridProperties: ApiDescriptionProperty[] = [
    {
      name: 'spacing',
      description:
        "Defines the spacing in between the grid-item's. The value should be a number and the number is multiplied with 8px. The value 2 would result in 16px spacing, 3 would result in 24px, 4 would result in 24px etc.",
      defaultValue: '3',
      type: ['0', '1', '2', '3', '4', '5'],
    },
  ];
  gridItemProperties: ApiDescriptionProperty[] = [
    {
      name: 'xs',
      description: 'Defines the column span for xtra-small screen sizes.',
      defaultValue: 'null',
      type: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    {
      name: 'sm',
      description: 'Defines the column span for small screen sizes.',
      defaultValue: 'null',
      type: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    {
      name: 'md',
      description: 'Defines the column span for medium screen sizes.',
      defaultValue: 'null',
      type: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    {
      name: 'lg',
      description: 'Defines the column span for large screen sizes.',
      defaultValue: 'null',
      type: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    {
      name: 'xl',
      description: 'Defines the column span for xtra-large screen sizes.',
      defaultValue: 'null',
      type: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
  ];
}
