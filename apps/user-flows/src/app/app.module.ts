import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KirbyModule } from '@kirbydesign/designsystem';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionDetailsFlowComponent } from './transaction-details-flow/transaction-details-flow.component';
import { TransactionDetailsForyouComponent } from './transaction-details-flow/transaction-details-foryou/transaction-details-foryou.component';
@NgModule({
  declarations: [
    AppComponent,
    TransactionDetailsFlowComponent,
    TransactionDetailsForyouComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, KirbyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
