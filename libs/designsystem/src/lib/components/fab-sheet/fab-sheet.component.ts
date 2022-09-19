import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  get isBackdropVisible() {
    return this._isBackdropVisible;
  }

  @ContentChild(ActionSheetComponent, { static: false }) actionSheet: ActionSheetComponent;

  @ViewChild(IonFabButton, { static: true, read: ElementRef })
  ionFabButton: ElementRef<HTMLElement>;

  @ViewChild(IonFab, { static: true })
  ionFab: IonFab;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngAfterContentInit(): void {
    if (!!this.actionSheet) {
      this.actionSheet.hideCancel = true;
    }
  }

  hideActions() {
    this.ionFab.close().then(() => this.fabSheetStateChanged(false));
  }

  onFabButtonClick() {
    setTimeout(() => {
      this.fabSheetStateChanged(this.ionFab.activated);
    });
  }

  onFabListClick() {
    this.ionFab.close().then(() => {
      this.fabSheetStateChanged(false);
    });
  }

  fabSheetStateChanged(isOpen: boolean) {
    this._isFabSheetOpen = isOpen;
    if (this.isFabSheetOpen) {
      this.renderer.addClass(this.document.body, 'fab-sheet-active');
    } else {
      this.renderer.removeClass(this.document.body, 'fab-sheet-active');
    }

    this._isBackdropVisible = !!this.actionSheet && isOpen;
    this.changeDetectorRef.detectChanges();
  }
}
