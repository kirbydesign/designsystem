import { NgModule } from '@angular/core';
import { IONIC_CONFIG } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IonIcon } from '@ionic/angular/standalone';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [IonicModule.forRoot(IONIC_CONFIG), ThemeColorDirective, IonIcon],
  declarations: [IconComponent],
  exports: [IconComponent, ThemeColorDirective],
})
export class IconModule {}
