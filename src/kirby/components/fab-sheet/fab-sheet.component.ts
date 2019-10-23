import { Component, ContentChild, HostBinding, Input, AfterContentInit } from '@angular/core';
import { IonFab } from '@ionic/angular';

import { ActionSheetComponent } from '../modal/action-sheet/action-sheet.component';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements AfterContentInit {
  @Input() disabled?: boolean = false;
  @Input() horizontalAlignment?: 'left' | 'center' | 'right' = 'right';

  @HostBinding('class.is-open')
  isFabSheetOpen: boolean = false;

  @HostBinding('class.backdrop-visible')
  private _isBackdropVisible: boolean = false;

  @ContentChild(ActionSheetComponent, { static: false }) actionSheet: ActionSheetComponent;

  ngAfterContentInit(): void {
    if (this.actionSheet) {
      this.actionSheet.hideCancel = true;
    }
  }

  hideActions(fab: IonFab) {
    fab.close();
    this.isFabSheetOpen = false;
    this._isBackdropVisible = false;
  }

  onFabClick(fab: IonFab) {
    this.isFabSheetOpen = !fab.activated;
    setTimeout(() => (this._isBackdropVisible = this.isFabSheetOpen));
  }
}
