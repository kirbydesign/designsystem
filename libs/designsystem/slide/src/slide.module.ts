import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

import { SlideDirective } from './slide.directive';
import { SlidesComponent } from './slides.component';

const declarations = [SlideDirective, SlidesComponent];
@NgModule({
  declarations: [...declarations],
  imports: [KirbyIonicModule, CommonModule],
  exports: [...declarations],
})
export class SlideModule {}
