import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import {KirbyModule} from '~/kirby/kirby.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {CardDesignerComponent} from './design/card-designer/card-designer.component';
import {CardExampleComponent} from './examples/card-example/card-example.component';
import {ButtonExampleComponent} from './examples/button-example/button-example.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardDesignerComponent,
    CardExampleComponent,
    ButtonExampleComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    KirbyModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
