import { NgModule } from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IonIcon } from '@ionic/angular/standalone';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [ThemeColorDirective, IonIcon],
  declarations: [IconComponent],
  exports: [IconComponent, ThemeColorDirective],
})
export class IconModule {}
