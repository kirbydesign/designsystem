import { Injectable } from '@angular/core';
import { Other } from './other';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtherService {
  regNo: number;
  accNo: number;
  name: string;

  Others: Other[] = [
    { id: 1, name: 'Harvey Specter', regNo: 1234, accNo: 12345678 },
    { id: 2, name: 'Darth Vader', regNo: 1234, accNo: 12345678 },
    { id: 3, name: 'Rasmoose', regNo: 1234, accNo: 12345678 },
  ];

  otherSelectedId: number;

  private formFilledSource = new Subject<boolean>(); //Observable boolean source
  formFilled$ = this.formFilledSource.asObservable();

  private receiverSelectedSource = new Subject<Other[]>();
  receiverSelected$ = this.receiverSelectedSource.asObservable();

  private receiverSeletecIdSource = new Subject<number>();
  receiverSelectedId$ = this.receiverSeletecIdSource.asObservable();

  private receiverSeletecBooleanSource = new Subject<boolean>();
  receiverSelectedBoolean$ = this.receiverSeletecBooleanSource.asObservable();

  constructor() {}

  public setFormFilled(boolean: boolean) {
    this.formFilledSource.next(boolean);
  }

  public getFormFilled(): Observable<boolean> {
    const FORMFILLED = this.formFilledSource;
    return FORMFILLED;
  }

  public getOther(): Other[] {
    return this.Others;
  }

  public setSelected(id: number) {
    this.otherSelectedId = id;
  }

  public saveReceiver() {
    const other: Other = {
      id: this.Others.length + 1,
      name: this.name,
      regNo: this.regNo,
      accNo: this.accNo,
    };

    this.Others.push(other);
  }

  public setRegNo(number: number) {
    this.regNo = number;
  }

  public setAccNo(number: number) {
    this.accNo = number;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setReceiver(id: number) {
    this.receiverSeletecBooleanSource.next(true);
    this.receiverSeletecIdSource.next(id);
    this.receiverSelectedSource.next(this.Others.filter((accounts) => accounts.id === id));
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
}
