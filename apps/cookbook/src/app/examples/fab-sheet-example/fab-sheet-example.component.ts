import { Component, Input } from '@angular/core';

import { ActionSheetItem } from '@kirbydesign/designsystem';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
import { FabSheetComponent } from '@kirbydesign/designsystem/fab-sheet';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ActionSheetComponent } from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'cookbook-fab-sheet-example',
  templateUrl: './fab-sheet-example.component.html',
  imports: [FabSheetComponent, IconModule, ActionSheetComponent],
})
export class FabSheetExampleComponent {
  @Input() disableFabSheet = false;

  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  constructor(private toastController: ToastController) {}

  onItemSelect(item: ActionSheetItem) {
    const config: ToastConfig = {
      message: `'${item.text}' was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
