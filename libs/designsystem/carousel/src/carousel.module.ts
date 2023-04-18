import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CarouselComponent } from './carousel.component';
import { CarouselSlideDirective } from './carousel-slide.directive';

const declarations = [CarouselComponent, CarouselSlideDirective];

@NgModule({
  imports: [CommonModule, KirbyIonicModule, ButtonComponent, IconModule],
  declarations: [...declarations],
  exports: [...declarations],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselModule {}
