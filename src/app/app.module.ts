import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SideNavComponent} from './page/side-nav/side-nav.component';
import {HeaderComponent} from './page/header/header.component';
import {IntroComponent} from './intro/intro.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SideNavComponent,
        HeaderComponent,
        IntroComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
