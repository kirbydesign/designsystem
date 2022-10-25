import { Component, OnInit } from '@angular/core';
import { OwnAccountService } from '../own-account.service';
import { OwnAccount } from '../own-account';
@Component({
  selector: 'flows-own-account-page',
  templateUrl: './own-account-page.component.html',
  styleUrls: ['./own-account-page.component.scss'],
})
export class OwnAccountPageComponent implements OnInit {
  constructor(private OwnAccountService: OwnAccountService) {}
  accounts: OwnAccount[] = [];
  ngOnInit(): void {
    this.accounts = this.OwnAccountService.getOwnAccounts();
  }

  setSelected(id: number) {
    this.OwnAccountService.setSelected(id);
  }
}
