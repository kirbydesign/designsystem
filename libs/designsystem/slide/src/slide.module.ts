import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { SlidesComponent } from './slides.component';
import { SlideDirective } from './slide.directive';

const declarations = [SlidesComponent, SlideDirective];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule, KirbyIonicModule, ButtonComponent, IconModule],
  exports: [...declarations],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideModule {}
