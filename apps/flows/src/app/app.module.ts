import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KirbyModule } from '@kirbydesign/designsystem';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListItemComponent } from './long-list-flow/list-item/list-item.component';
import { LongListFlowComponent } from './long-list-flow/long-list-flow.component';
import { LongListComponent } from './long-list-flow/long-list/long-list.component';
import { AccountComponent } from './transaction-details-flow/account/account.component';
import { ForYouComponent } from './transaction-details-flow/for-you/for-you.component';
import { TransactionDetailsFlowComponent } from './transaction-details-flow/transaction-details-flow.component';
import { TransactionDetailsComponent } from './transaction-details-flow/transaction-details/transaction-details.component';
import { TransactionsComponent } from './transaction-details-flow/transactions/transactions.component';
import { HomePageComponent } from './transfer-and-pay-flow/home-page/home-page.component';
import { TransferAndPayModalComponent } from './transfer-and-pay-flow/transfer-and-pay-modal/transfer-and-pay-modal.component';
import { TransferAndPayFlowComponent } from './transfer-and-pay-flow/transfer-and-pay-flow.component';
import { ChooseReceiverComponent } from './transfer-and-pay-flow/choose-receiver/choose-receiver.component';
import { ChooseOwnAccountComponent } from './transfer-and-pay-flow/choose-own-account/choose-own-account.component';
import { OwnAccountPageComponent } from './transfer-and-pay-flow/own-account-page/own-account-page.component';
import { OtherPageComponent } from './transfer-and-pay-flow/other-page/other-page.component';
import { ChooseDateComponent } from './transfer-and-pay-flow/choose-date/choose-date.component';
import { ChooseTextAndMessageComponent } from './transfer-and-pay-flow/choose-text-and-message/choose-text-and-message.component';
import { TransferRegisteredComponent } from './transfer-and-pay-flow/transfer-registered/transfer-registered.component';
import { DetailsComponent } from './transfer-and-pay-flow/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LongListFlowComponent,
    HomeComponent,
    LongListComponent,
    ListItemComponent,
    TransactionDetailsFlowComponent,
    TransactionsComponent,
    TransactionDetailsComponent,
    ForYouComponent,
    AccountComponent,
    HomePageComponent,
    TransferAndPayModalComponent,
    TransferAndPayFlowComponent,
    ChooseReceiverComponent,
    ChooseOwnAccountComponent,
    OwnAccountPageComponent,
    OtherPageComponent,
    ChooseDateComponent,
    ChooseTextAndMessageComponent,
    TransferRegisteredComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, KirbyModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
