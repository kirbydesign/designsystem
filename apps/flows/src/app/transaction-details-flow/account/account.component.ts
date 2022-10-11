import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirbydesign-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {}

  onCardSelect() {
    const config: ToastConfig = {
      message: 'Your toast message',
      messageType: 'success',
      durationInMs: 10000,
    };
    this.toastController.showToast(config);
  }

  navigateToAccountSub() {
    this.router.navigate(['transactions'], { relativeTo: this.route });
  }
}
