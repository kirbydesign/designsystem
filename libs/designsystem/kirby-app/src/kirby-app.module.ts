import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonApp } from '@ionic/angular/standalone';
import { AppComponent as KirbyAppComponent } from './kirby-app.component';

@NgModule({
  imports: [CommonModule, IonApp, KirbyAppComponent],
  exports: [KirbyAppComponent],
})
export class KirbyAppModule {}
