import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesModule } from '../examples/examples.module';
import { DesignerRoutingModule } from './designer-routing.module';

import { CardDesignerComponent } from './card-designer/card-designer.component';

@NgModule({
  imports: [CommonModule, ExamplesModule, DesignerRoutingModule],
  declarations: [CardDesignerComponent],
})
export class DesignerModule {}
