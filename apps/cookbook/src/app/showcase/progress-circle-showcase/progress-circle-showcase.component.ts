import { Component } from '@angular/core';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-properties.component';

@Component({
  selector: 'cookbook-progress-circle-showcase',
  templateUrl: './progress-circle-showcase.component.html',
  styleUrls: ['./progress-circle-showcase.component.scss'],
})
export class ProgressCircleShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'value',
      description: 'Sets the progress percentage',
      defaultValue: '0',
      inputValues: ['[0 - 100]'],
    },
    {
      name: 'size',
      description: 'Sets the size of the circle',
      defaultValue: 'md',
      inputValues: ['sm', 'md', 'lg'],
    },
    {
      name: 'themeColor',
      description: 'The color of the progress stroke',
      defaultValue: 'success',
      inputValues: ['success', 'warning', 'danger'],
    },
  ];
}
