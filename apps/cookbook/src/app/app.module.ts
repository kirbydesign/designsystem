import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeData from '@angular/common/locales/en-DK';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { FooterComponent } from './page/footer/footer.component';
import { HeaderComponent } from './page/header/header.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { KirbyChristmasComponent } from './kirby-christmas/kirby-christmas.component';
import { ComponentOverviewComponent } from './component-overview/component-overview.component';
import { ComponentDisplayComponent } from './component-overview/component-display/component-display.component';

registerLocaleData(localeData);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    HeaderComponent,
    IntroComponent,
    FooterComponent,
    ComponentOverviewComponent,
    ComponentDisplayComponent,
    KirbyChristmasComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, KirbyModule],

  providers: [
    { provide: LOCALE_ID, useValue: 'en-DK' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
