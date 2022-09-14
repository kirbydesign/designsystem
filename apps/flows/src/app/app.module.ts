import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransactionFlowComponent } from './transaction-flow/transaction-flow.component';
import { TransactionItemComponent } from './transaction-flow/transaction-item/transaction-item.component';
import { TransactionListComponent } from './transaction-flow/transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionFlowComponent,
    HomeComponent,
    TransactionListComponent,
    TransactionItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, KirbyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
