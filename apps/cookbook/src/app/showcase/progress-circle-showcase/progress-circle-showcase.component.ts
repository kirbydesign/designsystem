import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-progress-circle-showcase',
  templateUrl: './progress-circle-showcase.component.html',
  styleUrls: ['./progress-circle-showcase.component.scss'],
})
export class ProgressCircleShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'value',
      description: 'Sets the progress percentage',
      defaultValue: '0',
      type: ['[0 - 100]'],
    },
    {
      name: 'size',
      description: 'Sets the size of the circle',
      defaultValue: 'md',
      type: ['sm', 'md', 'lg'],
    },
    {
      name: 'themeColor',
      description: 'The color of the progress stroke',
      defaultValue: 'success',
      type: ['success', 'warning', 'danger'],
    },
  ];
}
