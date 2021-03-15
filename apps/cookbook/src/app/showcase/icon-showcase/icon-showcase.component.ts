import { Component } from '@angular/core';
import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

import { defaultIcons } from '@kirbydesign/designsystem';
import { IconSizes } from '@kirbydesign/designsystem/components/icon/icon.component';

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
  sizes = IconSizes;

  properties: ShowcaseProperty[] = [
    {
      name: 'name',
      description: 'Name of the icon that you want to show.',
      defaultValue: 'cog',
      inputValues: defaultIcons,
    },
    {
      name: 'size',
      description: 'Determines the size of the icon.',
      defaultValue: 'sm',
      inputValues: Object.values(this.sizes),
    },
    {
      name: 'themeColor',
      description: 'Sets which color the icon should use from the theme palette.',
      defaultValue: 'null',
      inputValues: [
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
      inputValues: ['string'],
    },
  ];
}
