import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card'; // Remove in final version. This is only for test purposes.
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CarouselComponent } from './carousel.component';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';

const declarations = [CarouselComponent, CarouselSlideComponent];

@NgModule({
  imports: [CommonModule, CardModule, ButtonComponent, IconModule],
  declarations: [...declarations],
  exports: [...declarations],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselModule {}
