import { NgModule } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

import { IconComponent } from './icon.component';

@NgModule({
  imports: [KirbyIonicModule, ThemeColorDirective],
  declarations: [IconComponent],
  exports: [IconComponent, ThemeColorDirective],
})
export class IconModule {}
