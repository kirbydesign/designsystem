require('nativescript-orientation');
const platformCss = require('nativescript-platform-css');
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-GB';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { HeaderComponent } from './page/header/header.component';
import { IntroComponent } from './intro/intro.component';

registerLocaleData(localeEn);
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [AppComponent, HomeComponent, SideNavComponent, HeaderComponent, IntroComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor() {
    platformCss.sizeGroupings(true);
    platformCss.sizeGroupings([9999, 740, 320]);
  }
}
