import { Component } from '@angular/core';

import { icons } from '@kirbydesign/designsystem/components/icon/icon.component';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';

declare var require: any;

@Component({
  selector: 'kirby-icon-showcase',
  templateUrl: './icon-showcase.component.html',
  styleUrls: ['./icon-showcase.component.scss'],
})
export class IconShowcaseComponent {
  exampleHtml: string = `
<!-- Default icons -->
<kirby-icon name="NAME"></kirby-icon>
<!-- Custom icons -->
<kirby-icon customName="NAME"></kirby-icon>
<!-- Size -->
<kirby-icon size="SIZE"></kirby-icon>
    `;
  iconNames: Array<string> = icons.map((x) => x.name);
  sizes = Sizes;

  properties: ShowcaseProperty[] = [
    {
      name: 'name',
      description: 'Name of the icon that you want to show.',
      defaultValue: 'cog',
      inputValues: this.iconNames,
    },
    {
      name: 'size',
      description: 'Determines size of the icon.',
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
      description: 'Used for custom icons font.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
  ];
}
