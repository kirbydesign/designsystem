import { ScrollingModule } from '@angular/cdk/scrolling';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en-GB';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdkAutoSizeVirtualScroll } from './examples/page-example/simple/window-virtual-scroll/auto-size-virtual-scroll';
import { KirbyPageVirtualScrollDirective } from './examples/page-example/simple/window-virtual-scroll/window-virtual-scroll.directive';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { FooterComponent } from './page/footer/footer.component';
import { HeaderComponent } from './page/header/header.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { FirebaseModule } from './shared/firebase/firebase.module';

registerLocaleData(localeEn);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    HeaderComponent,
    IntroComponent,
    FooterComponent,
    KirbyPageVirtualScrollDirective,
    CdkAutoSizeVirtualScroll,
  ],
  imports: [
    ScrollingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KirbyModule,
    FirebaseModule,
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
