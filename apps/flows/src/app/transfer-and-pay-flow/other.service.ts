import { Injectable } from '@angular/core';
import { Other } from './other';

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

  constructor() {}

  public getOther(): Other[] {
    return this.Others;
  }

  public setSelected(id: number) {
    this.otherSelectedId = id;
  }

  public saveReceiver() {
    const other: Other = {
      id: this.Others.length,
      name: this.name,
      regNo: this.regNo,
      accNo: this.accNo,
    };

    console.log(other);
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
}
