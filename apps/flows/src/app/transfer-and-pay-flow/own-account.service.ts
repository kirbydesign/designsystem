import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OwnAccount } from './own-account.model';

@Injectable({
  providedIn: 'root',
})
export class OwnAccountService {
  private senderId: number;
  private receiverId: number;

  private selectedAccountSource = new Subject<OwnAccount[]>();
  selectedAccount$ = this.selectedAccountSource.asObservable();

  private selectedReceiverNumberSource = new Subject<number>();
  selectedReceiverNumber$ = this.selectedReceiverNumberSource.asObservable();

  private selectedReceiverSource = new Subject<OwnAccount[]>();
  selectedReceiver$ = this.selectedReceiverSource.asObservable();

  private selectedSenderIdSource = new BehaviorSubject<number>(0);
  selectedSenderId$ = this.selectedSenderIdSource.asObservable();

  private accounts: OwnAccount[] = [
    { balance: 200, selected: false, name: 'Account1', id: 1 },
    { balance: 2000, selected: false, name: 'Account2', id: 2 },
    { balance: 20000, selected: false, name: 'Account3', id: 3 },
    { balance: 200000, selected: false, name: 'Account4', id: 4 },
    { balance: 2000000, selected: false, name: 'Account5', id: 5 },
    { balance: 20000000, selected: false, name: 'Account6', id: 6 },
    { balance: 200000000, selected: false, name: 'Account7', id: 7 },
    { balance: 2000000000, selected: false, name: 'Account8', id: 8 },
  ];

  public getOwnAccounts(): OwnAccount[] {
    return this.accounts;
  }

  setSelected(id: number) {
    this.senderId = id;
    const selectedOwnAccount = this.accounts.filter((accounts) => accounts.id === this.senderId);
    if (selectedOwnAccount) {
      this.selectedAccountSource.next(selectedOwnAccount);
    }

    this.selectedSenderIdSource.next(id);
  }

  setSelectedReceiver(id: number) {
    this.receiverId = id;
    this.selectedReceiverNumberSource.next(this.receiverId);

    const selectedReceiver = this.accounts.filter((accounts) => accounts.id === id);
    if (selectedReceiver) {
      this.selectedReceiverSource.next(selectedReceiver);
    }
  }

  getSelectedReceiverNumber$(): Observable<number> {
    return this.selectedReceiverNumberSource.asObservable();
  }

  public getOwnAccountSelected$(): Observable<OwnAccount[]> {
    return this.selectedAccountSource.asObservable();
  }

  public getSelectedReceiver$(): Observable<OwnAccount[]> {
    return this.selectedReceiverSource.asObservable();
  }

  public getSelectedSenderId$(): Observable<number> {
    return this.selectedSenderIdSource.asObservable();
  }
}
