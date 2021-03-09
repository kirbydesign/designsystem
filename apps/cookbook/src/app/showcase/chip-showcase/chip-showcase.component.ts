import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-chip-showcase',
  templateUrl: './chip-showcase.component.html',
  styleUrls: ['./chip-showcase.component.scss'],
})
export class ChipShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'text',
      description: 'The text displayed inside the chip',
      inputValues: ['string'],
    },
    {
      name: 'isSelected',
      description: 'Show chip as selected',
      inputValues: ['boolean'],
    },
  ];

  themeColors = [
    { text: 'None', value: '' },
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
  ];
  themeColor = '';

  onThemeChange(themeColor) {
    this.themeColor = themeColor;
  }
}
