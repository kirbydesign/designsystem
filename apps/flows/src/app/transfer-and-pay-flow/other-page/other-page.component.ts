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

  constructor(private OtherService: OtherService) {}

  Others: Other[] = [];

  ngOnInit(): void {
    this.Others = this.OtherService.getOther();
    this.OtherService.setFormFilled(false);
    this.OtherService.getReceiverId$().subscribe((number) => (this.selectedId = number));
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
    this.OtherService.setName(this.name);
  }

  setSelected(number: number) {
    this.OtherService.setReceiver(number);
  }
}
