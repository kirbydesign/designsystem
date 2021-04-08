import { Component } from '@angular/core';

import { AvatarSize, Color, ColorHelper } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-avatar-example',
  templateUrl: './avatar-example.component.html',
  styleUrls: ['./avatar-example.component.scss'],
})
export class AvatarExampleComponent {
  imageSrc = '/assets/images/woman.png';
  altText: 'Kirby Avatar Example';
  sizes = AvatarSize;
  colors: Color[] = [...ColorHelper.mainColors, { name: 'white', value: '#ffffff' }];

  getColorAbbrevation(color: Color) {
    return color.name.substr(0, 1).toUpperCase();
  }
}
