import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-flag-showcase',
  templateUrl: './flag-showcase.component.html',
  styleUrls: ['./flag-showcase.component.scss'],
})
export class FlagShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'themeColor',
      description: 'Sets which color the flag should use.',
      defaultValue: 'transparent',
      type: ['success', 'warning', 'danger', 'semi-light', 'transparent'],
    },
    {
      name: 'size',
      description: 'Sets the size of the flag.',
      defaultValue: 'md',
      type: ['xs', 'sm', 'md'],
    },
  ];
}
