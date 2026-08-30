import { NgModule } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [IonIcon, IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
