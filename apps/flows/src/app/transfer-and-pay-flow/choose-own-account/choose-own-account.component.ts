import { Component, OnInit } from '@angular/core';
import { OwnAccount } from '../own-account';
import { OwnAccountService } from '../own-account.service';
@Component({
  selector: 'flows-choose-own-account',
  templateUrl: './choose-own-account.component.html',
})
export class ChooseOwnAccountComponent implements OnInit {
  constructor(private OwnAccountService: OwnAccountService) {}

  accounts: OwnAccount[] = [];

  ngOnInit(): void {
    this.accounts = this.OwnAccountService.getOwnAccounts();
  }
  setSelected(id: number) {
    this.OwnAccountService.setSelected(id);
  }
}
