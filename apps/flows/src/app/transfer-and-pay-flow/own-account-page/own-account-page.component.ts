import { Component, OnInit } from '@angular/core';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account.model';
import { OtherService } from '../other.service';
import { Modal } from '@kirbydesign/designsystem';
@Component({
  selector: 'flows-own-account-page',
  templateUrl: './own-account-page.component.html',
})
export class OwnAccountPageComponent implements OnInit {
  public receiverID: number;
  public accounts: OwnAccount[] = [];

  constructor(
    private ownAccountService: OwnAccountService,
    private otherService: OtherService,
    private modal: Modal
  ) {}

  ngOnInit(): void {
    this.accounts = this.ownAccountService.getOwnAccounts();
    this.ownAccountService
      .getSelectedReceiverNumber$()
      .subscribe((receiverID) => (this.receiverID = receiverID));
  }

  setSelectedReceiver(id: number) {
    this.ownAccountService.setSelectedReceiver(id);
    this.otherService.setReceiverSelectedTrue();
    this.modal.close();
  }
}
