import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransactionFlowComponent } from './transaction-flow/transaction-flow.component';
import { TransactionListModule } from './transaction-flow/transaction-list/transaction-list.module';

@NgModule({
  declarations: [AppComponent, TransactionFlowComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, KirbyModule, TransactionListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
