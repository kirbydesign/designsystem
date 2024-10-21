import { Component, OnInit } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';
import { Other } from '../other.model';
import { OtherService } from '../other.service';

@Component({
  selector: 'flows-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.scss'],
})
export class OtherPageComponent implements OnInit {
  public registerNumber: string;
  public accountNumber: string;
  public name: string;
  public selectedId: number;
  public receiverInputSelected = false;

  constructor(
    private otherService: OtherService,
    private modal: Modal
  ) {}

  public Others: Other[] = [];

  ngOnInit(): void {
    this.Others = this.otherService.getOther();
    this.otherService.setFormFilled(false);
    this.otherService.getReceiverId$().subscribe((number) => (this.selectedId = number));
    this.otherService.setName('New receiver');
  }

  updateReceiverInputSelected(checked: boolean) {
    this.receiverInputSelected = checked;
  }

  updateRegisterNumberUpdateButtonState() {
    this.otherService.setRegNo(this.registerNumber);
    if (this.registerNumber.length > 3 && this.accountNumber.length >= 7) {
      this.otherService.setFormFilled(true);
    } else {
      this.otherService.setFormFilled(false);
    }
  }

  updateAccountNumberUpdateButtonState() {
    this.otherService.setAccNo(this.accountNumber);
    if (this.registerNumber.length >= 4 && this.accountNumber.length >= 7) {
      this.otherService.setFormFilled(true);
    } else {
      this.otherService.setFormFilled(false);
    }
  }

  updateName() {
    if (this.name.length >= 1) {
      this.otherService.setName(this.name);
    } else {
      this.otherService.setName(this.registerNumber + ' ' + this.accountNumber);
    }
  }

  setSelected(number: number) {
    this.otherService.setReceiver(number);
    this.otherService.setReceiverSelectedTrue();
    this.modal.close();
  }
}
