import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-GB';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { HeaderComponent } from './page/header/header.component';
import { IntroComponent } from './intro/intro.component';
import { KirbyModule } from '@kirbydesign/designsystem';
import { FirebaseModule } from './shared/firebase/firebase.module';

registerLocaleData(localeEn);

@NgModule({
  declarations: [AppComponent, HomeComponent, SideNavComponent, HeaderComponent, IntroComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KirbyModule,
    FirebaseModule,
  ],

  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
