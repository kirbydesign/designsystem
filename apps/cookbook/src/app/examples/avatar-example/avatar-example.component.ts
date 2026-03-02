import { Component } from '@angular/core';

import { AvatarSize, Color, ColorHelper } from '@kirbydesign/designsystem';
import { AvatarExampleDefaultComponent } from './examples/default';
import { AvatarExampleColorsComponent } from './examples/colors';
import { AvatarExampleTextComponent } from './examples/text';
import { AvatarExampleBadgeComponent } from './examples/badge';
import { AvatarExampleImageComponent } from './examples/image';
import { AvatarExampleImageSizeComponent } from './examples/avatar-sizes';
import { AvatarExampleImageLazyLoadingComponent } from './examples/image-lazy-loading';
import { AvatarExampleImageErrorComponent } from './examples/image-error';

@Component({
  selector: 'cookbook-avatar-example',
  templateUrl: './avatar-example.component.html',
  styleUrls: ['./avatar-example.component.scss'],
  imports: [
    AvatarExampleDefaultComponent,
    AvatarExampleColorsComponent,
    AvatarExampleTextComponent,
    AvatarExampleBadgeComponent,
    AvatarExampleImageComponent,
    AvatarExampleImageSizeComponent,
    AvatarExampleImageLazyLoadingComponent,
    AvatarExampleImageErrorComponent,
  ],
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
