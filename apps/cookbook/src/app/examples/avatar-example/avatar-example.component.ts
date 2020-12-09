import { Component, OnInit } from '@angular/core';

import { Color, ColorHelper, Sizes } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-avatar-example',
  templateUrl: './avatar-example.component.html',
  styleUrls: ['./avatar-example.component.scss'],
})
export class AvatarExampleComponent {
  imageSrc = '/assets/images/woman.png';
  altText: 'Kirby Avatar Example';
  sizes = Object.keys(Sizes).map((key) => Sizes[key]);
  colors: Color[] = [...ColorHelper.mainColors, { name: 'white', value: '#ffffff' }];

  getColorAbbrevation(color: Color) {
    return color.name.substr(0, 1).toUpperCase();
  }
}
