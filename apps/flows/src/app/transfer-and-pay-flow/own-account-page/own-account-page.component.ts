import { Component, OnInit } from '@angular/core';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account';
@Component({
  selector: 'flows-own-account-page',
  templateUrl: './own-account-page.component.html',
  styleUrls: ['./own-account-page.component.scss'],
})
export class OwnAccountPageComponent implements OnInit {
  receiverID: number;
  constructor(private OwnAccountService: OwnAccountService) {}
  accounts: OwnAccount[] = [];
  ngOnInit(): void {
    this.accounts = this.OwnAccountService.getOwnAccounts();
    this.OwnAccountService.getSelectedReceiver().subscribe((number) => (this.receiverID = number));
  }

  setSelectedReceiver(id: number) {
    this.OwnAccountService.setSelectedReceiver(id);
    console.log(this.receiverID);
  }
}
