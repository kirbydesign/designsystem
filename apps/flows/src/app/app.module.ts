import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListItemComponent } from './long-list-flow/list-item/list-item.component';
import { LongListFlowComponent } from './long-list-flow/long-list-flow.component';
import { LongListComponent } from './long-list-flow/long-list/long-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LongListFlowComponent,
    HomeComponent,
    LongListComponent,
    ListItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, KirbyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
