import { Component, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { ActionSheetConfig } from './config/action-sheet-config';
import { IModalController } from '../services/modal.controller.interface';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  @Output() result = new EventEmitter<string>();
  config: ActionSheetConfig;
  // we need this to detect the first click
  isOpeningClick: boolean = true;
  constructor(private _eref: ElementRef, private modalController: IModalController) {}

  onItemSelect(selection: string) {
    this.result.emit(selection);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target) && !this.isOpeningClick) {
      this.modalController.hideWindow();
    }

    // only the first click opens the action sheet,
    // so we set the flag to false for the rest of the component's lifecycle
    if (this.isOpeningClick) {
      this.isOpeningClick = false;
    }
  }
}
