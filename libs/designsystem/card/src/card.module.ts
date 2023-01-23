import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardAsButtonDirective } from './card-as-button/card-as-button.directive';

const declarations = [
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardAsButtonDirective,
];
@NgModule({
  imports: [CommonModule, ThemeColorDirective],
  declarations: [...declarations],
  exports: [...declarations, ThemeColorDirective],
})
export class CardModule {}
