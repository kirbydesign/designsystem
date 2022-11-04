import { Component, OnInit } from '@angular/core';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account';
import { Modal } from '@kirbydesign/designsystem';
@Component({
  selector: 'flows-own-account-page',
  templateUrl: './own-account-page.component.html',
  styleUrls: ['./own-account-page.component.scss'],
})
export class OwnAccountPageComponent implements OnInit {
  receiverID: number;
  constructor(private ownAccountService: OwnAccountService, private modal: Modal) {}
  accounts: OwnAccount[] = [];

  ngOnInit(): void {
    this.accounts = this.ownAccountService.getOwnAccounts();
    this.ownAccountService
      .getSelectedReceiverNumber$()
      .subscribe((number) => (this.receiverID = number));
  }

  setSelectedReceiver(id: number) {
    this.ownAccountService.setSelectedReceiver(id);
    this.modal?.close();
  }
}
