import { Injectable } from '@angular/core';
import { OwnAccount } from './own-account.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RangeValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OwnAccountService {
  private senderID: number;
  private receiverID: number;

  private selectedAccountSource = new Subject<OwnAccount[]>();
  selectedAccount$ = this.selectedAccountSource.asObservable();

  private selectedReceiverNumberSource = new Subject<number>();
  selectedReceiverNumber$ = this.selectedReceiverNumberSource.asObservable();

  private selectedReceiverSource = new Subject<OwnAccount[]>();
  selectedReceiver$ = this.selectedReceiverSource.asObservable();

  private selectedSenderIndexSource = new BehaviorSubject<number>(0);
  selectedSenderIndex$ = this.selectedSenderIndexSource.asObservable();

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
    this.senderID = id;
    const selectedOwnAccount = this.accounts.filter((accounts) => accounts.id === this.senderID);
    if (selectedOwnAccount) {
      this.selectedAccountSource.next(selectedOwnAccount);
    }

    this.selectedSenderIndexSource.next(id);
  }

  setSelectedReceiver(id: number) {
    this.receiverID = id;
    this.selectedReceiverNumberSource.next(this.receiverID);

    this.selectedReceiverSource.next(this.accounts.filter((accounts) => accounts.id === id));
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
    return this.selectedSenderIndexSource.asObservable();
  }
}
