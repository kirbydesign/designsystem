import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KirbyModule } from '@kirbydesign/designsystem';
import { IonLifecycleComponent } from './ion-lifecycle.component';
import { IonLifecycleRoutes } from './ion-lifecycle.routing';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

@NgModule({
  imports: [IonLifecycleRoutes, KirbyModule, CommonModule],
  declarations: [IonLifecycleComponent, OneComponent, TwoComponent],
})
export class IonLifecycleModule {}
