import { Injectable } from '@angular/core';
import { OwnAccount } from './own-account';

@Injectable({
  providedIn: 'root',
})
export class OwnAccountService {
  SenderID: number;

  accounts: OwnAccount[] = [
    { balance: 200, selected: false, name: 'Account1', id: 1 },
    { balance: 2000, selected: false, name: 'Account2', id: 2 },
    { balance: 20000, selected: false, name: 'Account3', id: 3 },
    { balance: 200000, selected: false, name: 'Account4', id: 4 },
    { balance: 2000000, selected: false, name: 'Account5', id: 5 },
    { balance: 20000000, selected: false, name: 'Account6', id: 6 },
    { balance: 200000000, selected: false, name: 'Account7', id: 7 },
    { balance: 2000000000, selected: false, name: 'Account8', id: 8 },
  ];

  constructor() {}

  public getOwnAccounts(): OwnAccount[] {
    return this.accounts;
  }

  setSelected(id: number) {
    this.SenderID = id;
    this.accounts = this.accounts.map((account) => {
      account.selected = account.id == id;
      return account;
    });
  }
}
