import { Component, OnInit } from '@angular/core';
import { Modal } from '@kirbydesign/designsystem';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account.model';
import { OtherService } from '../other.service';
@Component({
  selector: 'flows-own-account-page',
  templateUrl: './own-account-page.component.html',
  standalone: false,
})
export class OwnAccountPageComponent implements OnInit {
  public receiverId: number;
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
      .subscribe((receiverId) => (this.receiverId = receiverId));
  }

  setSelectedReceiver(id: number) {
    this.ownAccountService.setSelectedReceiver(id);
    this.otherService.setReceiverSelectedTrue();
    this.modal.close();
  }
}
