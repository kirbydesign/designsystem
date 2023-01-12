import { NgModule } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

import { IconComponent } from './icon.component';

@NgModule({
  imports: [KirbyIonicModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
