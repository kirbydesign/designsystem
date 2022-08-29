import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home.page';
import { TransactionItemModule } from './transaction-item/transaction-item.module';

@NgModule({
  imports: [CommonModule, KirbyModule, HomePageRoutingModule, TransactionItemModule],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
