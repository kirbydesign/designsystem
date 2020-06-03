import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AvatarExampleDefaultComponent } from './examples/default';
import { AvatarExampleColorsComponent } from './examples/colors';
import { AvatarExampleTextComponent } from './examples/text';
import { AvatarExampleIconComponent } from './examples/icon';
import { AvatarExampleBadgeComponent } from './examples/badge';
import { AvatarExampleImageComponent } from './examples/image';
import { AvatarExampleImageSizeComponent } from './examples/image-sizes';

const COMPONENT_DECLARATIONS = [
  AvatarExampleDefaultComponent,
  AvatarExampleColorsComponent,
  AvatarExampleTextComponent,
  AvatarExampleIconComponent,
  AvatarExampleBadgeComponent,
  AvatarExampleImageComponent,
  AvatarExampleImageSizeComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AvatarExampleModule {}
