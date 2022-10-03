import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

import { SlideDirective, SlidesComponent } from './slides.component';

@NgModule({
  imports: [CommonModule, SwiperModule],
  declarations: [SlidesComponent, SlideDirective],
  exports: [SlidesComponent, SlideDirective],
})
export class SlidesModule {}
