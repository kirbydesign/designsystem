import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertExperimentalComponent } from './alert.component';
import { AlertExperimentalController } from './services/alert.controller';

@NgModule({
  imports: [CommonModule, IonicModule, AlertExperimentalComponent],
  providers: [AlertExperimentalController],
})
export class AlertExperimentalModule {}
