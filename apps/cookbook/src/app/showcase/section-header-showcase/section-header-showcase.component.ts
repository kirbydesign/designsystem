import { Component } from '@angular/core';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-section-header-showcase',
  templateUrl: './section-header-showcase.component.html',
  styleUrls: ['./section-header-showcase.component.scss'],
})
export class SectionHeaderShowcaseComponent {
  _cssCustomPropertiesColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
    default: 'Default',
  };

  _cssCustomProperties: ApiDescriptionProperty[] = [
    {
      name: '--kirby-section-header-color',
      description:
        'Sets the color property of the section header. This changes the color of the text slotted within, when using heading, label or detail.',
      defaultValue: 'black',
    },
  ];
}
