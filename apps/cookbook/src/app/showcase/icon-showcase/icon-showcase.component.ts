import { Component } from '@angular/core';
import { defaultIcons, IconSize } from '@kirbydesign/designsystem';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-icon-showcase',
  templateUrl: './icon-showcase.component.html',
  styleUrls: ['./icon-showcase.component.scss'],
  preserveWhitespaces: true,
})
export class IconShowcaseComponent {
  exampleHtml: string = `<!-- Default icons -->
<kirby-icon name="NAME"></kirby-icon>
<!-- Custom icons -->
<kirby-icon customName="NAME"></kirby-icon>
<!-- Size -->
<kirby-icon size="SIZE"></kirby-icon>`;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'name',
      description: 'Name of the icon that you want to show.',
      defaultValue: 'cog',
      type: defaultIcons,
    },
    {
      name: 'size',
      description: 'Determines the size of the icon.',
      defaultValue: IconSize.SM,
      type: Object.values(IconSize),
    },
    {
      name: 'themeColor',
      description: 'Sets which color the icon should use from the theme palette.',
      defaultValue: 'null',
      type: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'light',
        'medium',
        'dark',
      ],
    },
    {
      name: 'customName',
      description: 'Used for custom icons.',
      defaultValue: 'null',
      type: ['string'],
    },
  ];
}
