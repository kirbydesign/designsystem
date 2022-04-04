import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  AfterContentInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonFab, IonFabButton, IonIcon } from '@ionic/angular';

import { ActionSheetComponent } from '../modal/action-sheet/action-sheet.component';
import { kirbyIconSettings } from '../icon/kirby-icon-settings';
import { Icon } from '../icon/icon-settings';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements AfterContentInit, AfterViewInit {
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

  @ViewChild(IonFabButton, { static: true, read: ElementRef }) ionFabButton: ElementRef<
    HTMLElement
  >;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  ngAfterViewInit(): void {
    const kirbyCloseIcon = kirbyIconSettings.icons.find((icon) => icon.name === 'close');
    this.setCloseIcon(kirbyCloseIcon);
  }

  private setCloseIcon(kirbyCloseIcon: Icon, retryCount = 0) {
    const maxRetryCount = 20;
    const retryDelayInMs = 20;
    const fabButtonElement = this.ionFabButton.nativeElement;
    if (!fabButtonElement || !kirbyCloseIcon || retryCount >= maxRetryCount) {
      return;
    }
    if (fabButtonElement.shadowRoot && fabButtonElement.shadowRoot.innerHTML) {
      const closeIcon = fabButtonElement.shadowRoot.querySelector('.close-icon ion-icon');
      if (closeIcon) {
        const closeIconSvgLoaded = closeIcon.shadowRoot.querySelector('.icon-inner svg');
        const ionCloseIcon = (closeIcon as unknown) as IonIcon;
        if (ionCloseIcon && closeIconSvgLoaded) {
          ionCloseIcon.src = kirbyCloseIcon.svg;
          return;
        }
      }
    }
    retryCount++;
    setTimeout(() => this.setCloseIcon(kirbyCloseIcon, retryCount), retryDelayInMs);
  }

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
