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
  }

  receiverInputSelected = false;

  onCheckedChange(checked: boolean) {
    this.receiverInputSelected = checked;
    console.log(this.receiverInputSelected);
  }

  onChangedReg() {
    this.OtherService.setRegNo(this.regNo);
  }
  onChangedAcc() {
    this.OtherService.setAccNo(this.accNo);
  }

  onChangedName() {
    this.OtherService.setName(this.name);
  }

  setSelected(number: number) {
    this.selectedId = number;
    console.log(this.selectedId);
  }
}
