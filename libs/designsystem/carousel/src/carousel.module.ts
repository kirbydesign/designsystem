import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card'; // Remove in final version. This is only for test purposes.
import { CarouselComponent } from './carousel.component';

const declarations = [CarouselComponent];

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [...declarations],
  exports: [...declarations],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselModule {}
