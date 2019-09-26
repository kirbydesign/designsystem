import { Component, HostBinding } from '@angular/core';
import { ActionSheetItem } from '@kirbydesign/designsystem/components/modal/action-sheet/config/action-sheet-item';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kirby-page-example',
  templateUrl: './page-example.component.html',
  styleUrls: ['./page-example.component.scss'],
})
export class PageExampleComponent {
  @HostBinding('class') classList = 'ion-page';
  @HostBinding('class.demo') demoMode = this.route.snapshot.queryParams.mode === 'demo';

  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  constructor(private toastController: ToastController, private route: ActivatedRoute) {}

  onItemSelect(item: ActionSheetItem) {
    const config: ToastConfig = {
      message: `'${item.text}' was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
