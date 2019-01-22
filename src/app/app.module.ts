import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { HeaderComponent } from './page/header/header.component';
import { IntroComponent } from './intro/intro.component';
import { KirbyModule } from '../kirby/kirby.module';

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
        HttpClientModule,
        FormsModule,
        KirbyModule,
    ],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
