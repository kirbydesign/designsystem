import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import {
  ActionSheetConfig,
  ActionSheetItem,
  ModalController,
} from '@kirbydesign/designsystem/modal';

@Component({
  selector: 'kirby-action-sheet-example',
  templateUrl: './action-sheet-example.component.html',
})
export class ActionSheetExampleComponent {
  private config: ActionSheetConfig = {
    header: 'Your action sheet header',
    subheader: 'Your action sheet subheader',
    items: [
      { id: '1', text: 'Option 1' },
      { id: '2', text: 'Option 2' },
      { id: '3', text: 'Option 3' },
    ],
    cancelButtonText: 'Custom cancel',
  };

  constructor(private modalController: ModalController) {}

  showActionSheet() {
    this.modalController.showActionSheet(this.config, null, this.onActionSelected);
  }

  showReactiveActionSheet() {
    this.delayData(['John', 'Paul', 'Ringo', 'George'])
      .pipe(
        map((names) => {
          return names.map((name) => ({ id: name, text: name }));
        }),
        this.modalController.operators.showActionSheet(this.config)
      )
      .subscribe((response) =>
        console.log('Response from action sheet (in observable) was:', response)
      );
  }

  private onActionSelected(selection: ActionSheetItem) {
    console.log(`Action sheet selection: ${JSON.stringify(selection)}`);
  }

  private delayData(data: string[]) {
    const delayInSeconds = 2;
    return of(data).pipe(
      tap(() => console.log(`Delaying for ${delayInSeconds} seconds`)),
      delay(delayInSeconds * 1000)
    );
  }
}
