import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { ListComponent } from './list/list.component';
import { CardExampleComponent } from './examples/card-example/card-example.component';
import { CardDesignerComponent } from './design/card-designer/card-designer.component';
import { ButtonExampleComponent } from './examples/button-example/button-example.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ButtonComponent,
    ListComponent,
    CardExampleComponent,
    CardDesignerComponent,
    ButtonExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
