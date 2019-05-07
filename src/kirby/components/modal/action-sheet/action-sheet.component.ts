import { Component, ElementRef } from '@angular/core';

import { ActionSheetConfig } from './config/action-sheet-config';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  config: ActionSheetConfig;

  constructor(private _eref: ElementRef) {}

  onItemSelect(e: any) {
    console.log(`item selected: ${e}`);
  }

  onClick(e: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      console.log('clicked outside ...');
    }
  }
}
