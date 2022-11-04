import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';
import { Other } from '../other';
import { OtherService } from '../other.service';

@Component({
  selector: 'flows-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.scss'],
})
export class OtherPageComponent implements OnInit {
  regNo: number;
  accNo: number;
  name: string;
  selectedId: number;

  constructor(private OtherService: OtherService, private modal: Modal) {}

  Others: Other[] = [];

  ngOnInit(): void {
    this.Others = this.OtherService.getOther();
    this.OtherService.setFormFilled(false);
    this.OtherService.getReceiverId$().subscribe((number) => (this.selectedId = number));
    this.OtherService.setName('New receiver');
  }

  receiverInputSelected = false;

  onCheckedChange(checked: boolean) {
    this.receiverInputSelected = checked;
  }

  onChangedReg() {
    this.OtherService.setRegNo(this.regNo);
    if (this.regNo.toString().length > 3 && this.accNo.toString().length >= 7) {
      this.OtherService.setFormFilled(true);
    } else {
      this.OtherService.setFormFilled(false);
    }
  }
  onChangedAcc() {
    this.OtherService.setAccNo(this.accNo);
    if (this.regNo.toString().length >= 4 && this.accNo.toString().length >= 7) {
      this.OtherService.setFormFilled(true);
    } else {
      this.OtherService.setFormFilled(false);
    }
  }

  onChangedName() {
    if (this.name.length >= 1) {
      this.OtherService.setName(this.name);
    } else {
      this.OtherService.setName(this.regNo.toString() + ' ' + this.accNo.toString());
    }
  }

  setSelected(number: number) {
    this.OtherService.setReceiver(number);
    this.modal?.close();
  }
}
