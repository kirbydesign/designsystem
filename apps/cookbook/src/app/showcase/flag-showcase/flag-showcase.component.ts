import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'cookbook-flag-showcase',
  templateUrl: './flag-showcase.component.html',
  styleUrls: ['./flag-showcase.component.scss'],
})
export class FlagShowcaseComponent {
  properties: ShowcaseProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the flag should use.',
      defaultValue: 'transparent',
      inputValues: ['success', 'warning', 'danger', 'semi-light', 'transparent'],
    },
    {
      name: 'size',
      description: 'Sets the size of the flag.',
      defaultValue: 'md',
      inputValues: ['xs', 'sm', 'md'],
    },
  ];
}
