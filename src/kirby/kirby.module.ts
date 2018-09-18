import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CardComponent} from './components/card/card.component';
import {ButtonComponent} from './components/button/button.component';
import {ListComponent} from './components/list/list.component';

const declarations = [
  CardComponent,
  ButtonComponent,
  ListComponent,
];


@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations
})
export class KirbyModule { }
