import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { KirbyModule } from '@kirbydesign/designsystem';
import { EmitterService } from './emitter.service';
import { IonLifecycleComponent } from './ion-lifecycle.component';
import { IonLifecycleRoutes } from './ion-lifecycle.routing';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

@NgModule({
  imports: [IonLifecycleRoutes, KirbyModule, CommonModule, IonicModule.forRoot()],
  declarations: [IonLifecycleComponent, OneComponent, TwoComponent],
  providers: [EmitterService],
})
export class IonLifecycleModule {}
