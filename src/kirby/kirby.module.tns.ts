import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import {CardComponent} from './components/card/card.component';
import {ButtonComponent} from './components/button/button.component';
import {ListComponent} from './components/list/list.component';

const declarations = [
  CardComponent,
  ButtonComponent,
  ListComponent,
];

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: declarations,
  exports: declarations,
  schemas: [NO_ERRORS_SCHEMA]
})
export class KirbyModule { }
