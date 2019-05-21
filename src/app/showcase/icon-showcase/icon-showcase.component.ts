import { Component } from '@angular/core';

import { iconsCharCodeMap } from '@kirbydesign/designsystem/components/icon/icon.component';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

declare var require: any;

@Component({
  selector: 'kirby-icon-showcase',
  templateUrl: './icon-showcase.component.html',
  styleUrls: ['./icon-showcase.component.scss'],
})
export class IconShowcaseComponent {
  exampleHtml: string = require('../../examples/icon-example/icon-example.component.html');
  iconNames: Array<string> = new Array();

  constructor() {
    for (const key in iconsCharCodeMap) {
      this.iconNames.push(key);
    }
  }

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
      defaultValue: 'small',
      inputValues: ['small', 'large'],
    },
    {
      name: 'colortype',
      description: 'Sets which color the icon should use from the theme palette.',
      defaultValue: 'null',
      inputValues: ['primary', 'secondary', 'tertiary', 'warning', 'success', 'danger'],
    },
    {
      name: 'customName',
      description: 'Used for custom icons font.',
      defaultValue: 'null',
      inputValues: ['string'],
    },
  ];
}
