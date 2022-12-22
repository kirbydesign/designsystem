import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './card.component';
import { CardFooterComponent } from './src/card-footer/card-footer.component';
import { CardHeaderComponent } from './card-header/card-header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, CardFooterComponent, CardHeaderComponent],
  exports: [CardComponent, CardFooterComponent, CardHeaderComponent],
})
export class CardModule {}
