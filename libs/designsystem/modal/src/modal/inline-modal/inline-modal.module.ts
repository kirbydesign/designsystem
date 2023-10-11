import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { RouterModule } from '@angular/router';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ModalComponent } from './modal.component';

const COMPONENT_DECLARATIONS = [ModalComponent];
@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyIonicModule, IconModule, ButtonComponent, RouterModule],
  exports: COMPONENT_DECLARATIONS,
})
export class InlineModalModule {}
