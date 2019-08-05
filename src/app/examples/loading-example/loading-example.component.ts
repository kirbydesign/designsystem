import { Component, OnInit } from '@angular/core';


import { LoadingService } from '@kirbydesign/designsystem/services/loading/loading.service';

@Component({
  selector: 'kirby-loading-example',
  templateUrl: './loading-example.component.html',
  styleUrls: ['./loading-example.component.scss'],
})
export class LoadingExampleComponent {
  constructor(private loadingService: LoadingService) {
    this.showSpinner();
  }

  public showSpinner() {
    this.loadingService.showLoadingOverlay();
  }
}
