import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Other } from './other.model';

@Injectable({
  providedIn: 'root',
})
export class OtherService {
  public registerNumber: string;
  public accountNumber: string;
  public name: string;
  public otherSelectedId: number;

  Others: Other[] = [
    { id: 1, name: 'Harvey Specter', registerNumber: '1234', accountNumber: '12345678' },
    { id: 2, name: 'Darth Vader', registerNumber: '1234', accountNumber: '12345678' },
    { id: 3, name: 'Rasmoose', registerNumber: '1234', accountNumber: '12345678' },
  ];

  private formFilledSource = new Subject<boolean>(); //Observable boolean source
  formFilled$ = this.formFilledSource.asObservable();

  private receiverSelectedSource = new Subject<Other[]>();
  receiverSelected$ = this.receiverSelectedSource.asObservable();

  private receiverSeletecIdSource = new Subject<number>();
  receiverSelectedId$ = this.receiverSeletecIdSource.asObservable();

  private receiverSeletecBooleanSource = new Subject<boolean>();
  receiverSelectedBoolean$ = this.receiverSeletecBooleanSource.asObservable();

  public setFormFilled(boolean: boolean) {
    this.formFilledSource.next(boolean);
  }

  public getFormFilled(): Observable<boolean> {
    return this.formFilledSource.asObservable();
  }

  public getOther(): Other[] {
    return this.Others;
  }

  public setSelected(id: number) {
    this.otherSelectedId = id;
  }

  public addReceiver() {
    const other: Other = {
      id: this.Others.length + 1,
      name: this.name,
      registerNumber: this.registerNumber,
      accountNumber: this.accountNumber,
    };

    this.Others.push(other);
  }

  public setRegNo(number: string) {
    this.registerNumber = number;
  }

  public setAccNo(number: string) {
    this.accountNumber = number;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setReceiver(id: number) {
    this.receiverSeletecIdSource.next(id);
    const selectedOther = this.Others.filter((accounts) => accounts.id === id);
    if (selectedOther) {
      this.receiverSelectedSource.next(selectedOther);
    }
  }

  public getReceiver$(): Observable<Other[]> {
    return this.receiverSelectedSource.asObservable();
  }

  public getReceiverId$(): Observable<number> {
    return this.receiverSeletecIdSource.asObservable();
  }

  public getReceiverBoolean$(): Observable<boolean> {
    return this.receiverSeletecBooleanSource.asObservable();
  }

  public setReceiverSelectedTrue() {
    this.receiverSeletecBooleanSource.next(true);
  }
}
