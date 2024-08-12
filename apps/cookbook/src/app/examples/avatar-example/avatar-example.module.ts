import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { IconModule, IconRegistryService } from '@kirbydesign/designsystem/icon';

import { AvatarExampleComponent } from './avatar-example.component';
import { AvatarExampleDefaultComponent } from './examples/default';
import { AvatarExampleColorsComponent } from './examples/colors';
import { AvatarExampleTextComponent } from './examples/text';
import { AvatarExampleIconComponent } from './examples/icon';
import { AvatarExampleBadgeComponent } from './examples/badge';
import { AvatarExampleImageComponent } from './examples/image';
import { AvatarExampleImageSizeComponent } from './examples/image-sizes';
import { AvatarExampleImageErrorComponent } from './examples/image-error';

const COMPONENT_DECLARATIONS = [
  AvatarExampleComponent,
  AvatarExampleDefaultComponent,
  AvatarExampleColorsComponent,
  AvatarExampleTextComponent,
  AvatarExampleIconComponent,
  AvatarExampleBadgeComponent,
  AvatarExampleImageComponent,
  AvatarExampleImageSizeComponent,
  AvatarExampleImageErrorComponent,
];

@NgModule({
  imports: [CommonModule, AvatarComponent, BadgeComponent, IconModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class AvatarExampleModule {}
