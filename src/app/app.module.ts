import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { BulletListComponent } from './bullet-list/bullet-list.component';
import { CircleProgressComponent } from './circle-progress/circle-progress.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ButtonComponent,
    BulletListComponent,
    CircleProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
