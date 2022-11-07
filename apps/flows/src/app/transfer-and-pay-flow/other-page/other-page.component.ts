import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  constructor(private otherService: OtherService) {}

  Others: Other[] = [];

  ngOnInit(): void {
    this.Others = this.otherService.getOther();
    this.otherService.setFormFilled(false);
    this.otherService.getReceiverId$().subscribe((number) => (this.selectedId = number));
  }

  receiverInputSelected = false;

  onCheckedChange(checked: boolean) {
    this.receiverInputSelected = checked;
  }

  onChangedReg() {
    this.otherService.setRegNo(this.regNo);
    if (this.regNo.toString().length > 3 && this.accNo.toString().length >= 7) {
      this.otherService.setFormFilled(true);
    } else {
      this.otherService.setFormFilled(false);
    }
  }
  onChangedAcc() {
    this.otherService.setAccNo(this.accNo);
    if (this.regNo.toString().length >= 4 && this.accNo.toString().length >= 7) {
      this.otherService.setFormFilled(true);
    } else {
      this.otherService.setFormFilled(false);
    }
  }

  onChangedName() {
    this.otherService.setName(this.name);
  }

  setSelected(number: number) {
    this.otherService.setReceiver(number);
    this.otherService.setReceiverSelectedTrue();
  }
}
