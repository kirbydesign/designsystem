import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IonFab, IonFabButton } from '@ionic/angular';

import { ActionSheetComponent } from '../modal/action-sheet/action-sheet.component';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements AfterContentInit {
  @Input() disabled: boolean = false;
  @Input() horizontalAlignment: 'left' | 'center' | 'right' = 'right';

  private _isFabSheetOpen: boolean = false;
  @HostBinding('class.is-open')
  get isFabSheetOpen() {
    return this._isFabSheetOpen;
  }

  private _isBackdropVisible: boolean = false;
  @HostBinding('class.backdrop-visible')
  get isBackdropVisible() {
    return this._isBackdropVisible;
  }

  @ContentChild(ActionSheetComponent, { static: false }) actionSheet: ActionSheetComponent;

  @ViewChild(IonFabButton, { static: true, read: ElementRef })
  ionFabButton: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  ngAfterContentInit(): void {
    if (this.actionSheet) {
      this.actionSheet.hideCancel = true;
    }
  }

  hideActions(fab: IonFab) {
    fab.close();
    this._isFabSheetOpen = false;
    this._isBackdropVisible = false;
    this.renderer.removeClass(this.document.body, 'fab-sheet-active');
  }

  onFabClick(fab: IonFab) {
    this._isFabSheetOpen = !fab.activated;
    if (this._isFabSheetOpen) {
      this.renderer.addClass(this.document.body, 'fab-sheet-active');
    } else {
      this.renderer.removeClass(this.document.body, 'fab-sheet-active');
    }
    setTimeout(() => (this._isBackdropVisible = this.isFabSheetOpen));
  }
}
