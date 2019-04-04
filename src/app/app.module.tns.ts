require('nativescript-orientation');
const platformCss = require('nativescript-platform-css');
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { HeaderComponent } from './page/header/header.component';
import { IntroComponent } from './intro/intro.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [AppComponent, HomeComponent, SideNavComponent, HeaderComponent, IntroComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor() {
    platformCss.sizeGroupings(true);
    platformCss.sizeGroupings([9999, 740, 320]);
  }
}
