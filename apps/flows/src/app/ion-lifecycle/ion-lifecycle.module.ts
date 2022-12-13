import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KirbyModule } from '@kirbydesign/designsystem';
import { EmitterService } from './emitter.service';
import { IonLifecycleComponent } from './ion-lifecycle.component';
import { IonLifecycleRoutes } from './ion-lifecycle.routing';
import { OneComponent } from './one/one.component';
import { PageImplementerComponent } from './pageImplementer/pageImplementer.component';
import { TwoComponent } from './two/two.component';

@NgModule({
  imports: [IonLifecycleRoutes, KirbyModule, CommonModule],
  declarations: [IonLifecycleComponent, OneComponent, TwoComponent, PageImplementerComponent],
  providers: [EmitterService],
})
export class IonLifecycleModule {}
