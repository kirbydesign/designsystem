import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertExperimentalComponent } from './alert-experimental.component';
import { AlertExperimentalController } from './services/alert.controller';

@NgModule({
  imports: [CommonModule, AlertExperimentalComponent],
  providers: [AlertExperimentalController],
})
export class AlertExperimentalModule {}
