import { createCustomElement } from '@angular/elements';
import { NgModule } from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IonIcon } from '@ionic/angular/standalone';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [ThemeColorDirective, IonIcon, IconComponent],
  exports: [IconComponent, ThemeColorDirective],
})
export class IconModule {}
