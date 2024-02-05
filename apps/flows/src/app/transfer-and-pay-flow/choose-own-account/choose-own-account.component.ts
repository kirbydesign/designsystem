import { Component, OnInit } from '@angular/core';
import { OwnAccount } from '../own-account.model';
import { OwnAccountService } from '../own-account.service';
@Component({
  selector: 'flows-choose-own-account',
  templateUrl: './choose-own-account.component.html',
})
export class ChooseOwnAccountComponent implements OnInit {
  constructor(private ownAccountService: OwnAccountService) {}

  accounts: OwnAccount[] = [];
  selectedOwnAccountId: number;
  ngOnInit(): void {
    this.accounts = this.ownAccountService.getOwnAccounts();
    this.ownAccountService
      .getSelectedSenderId$()
      .subscribe((id) => (this.selectedOwnAccountId = id));
  }

  setSelected(id: number) {
    this.ownAccountService.setSelected(id);
  }
}
