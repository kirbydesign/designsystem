import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
const declarations = [CardComponent, CardFooterComponent, CardHeaderComponent];
@NgModule({
  imports: [CommonModule],
  declarations: [...declarations],
  exports: [...declarations],
})
export class CardModule {}
