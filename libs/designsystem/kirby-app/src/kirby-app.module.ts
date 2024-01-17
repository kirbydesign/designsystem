import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent as KirbyAppComponent } from './kirby-app.component';

@NgModule({
  declarations: [KirbyAppComponent],
  imports: [CommonModule],
  exports: [KirbyAppComponent],
})
export class KirbyAppModule {}
