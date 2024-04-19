import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types';

@Component({
  selector: 'cookbook-modal-example-configuration',
  templateUrl: './modal-example-configuration.component.html',
  styleUrls: ['./modal-example-configuration.component.scss'],
})
export class ModalExampleConfigurationComponent {
  @Input() disabled: boolean;

  @Input() showDummyKeyboard: boolean;
  @Output() showDummyKeyboardChange = new EventEmitter<boolean>();

  @Input() showPageProgress: boolean;
  @Output() showPageProgressChange = new EventEmitter<boolean>();

  @Input() collapseTitle: boolean;
  @Output() collapseTitleChange = new EventEmitter<boolean>();

  @Input() alertBeforeClose: boolean;
  @Output() alertBeforeCloseChange = new EventEmitter<boolean>();

  @Input() showFooter: boolean;
  @Output() showFooterChange = new EventEmitter<boolean>();

  @Input() displayFooterAsInline: boolean;
  @Output() displayFooterAsInlineChange = new EventEmitter<boolean>();

  @Input() showDummyContent: boolean;
  @Output() showDummyContentChange = new EventEmitter<boolean>();

  @Input() delayLoadDummyContent: boolean;
  @Output() delayLoadDummyContentChange = new EventEmitter<boolean>();

  @Input() loadAdditionalContent: boolean;
  @Output() loadAdditionalContentChange = new EventEmitter<boolean>();

  @Input() disableScroll: boolean;
  @Output() disableScrollChange = new EventEmitter<boolean>();

  @Input() interactWithBackground: boolean;
  @Output() interactWithBackgroundChange = new EventEmitter<boolean>();

  @Input() customCssClass: boolean;
  @Output() customCssClassChange = new EventEmitter<boolean>();

  @Input() snapFooterToKeyboard: boolean;
  @Output() snapFooterToKeyboardChange = new EventEmitter<boolean>();

  // Setting ion-checkbox.checked programatically triggers change event
  // Use this flag in checkbox change event handlers to prevent ExpressionChangedAfterItHasBeenCheckedError
  private preventChangeEvent = false;

  constructor(private windowRef: WindowRef) {}

  toggleDummyKeyboard(show: boolean) {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard = show;
    this.showDummyKeyboard
      ? this.windowRef.nativeWindow.sessionStorage.setItem(sessionKey, 'true')
      : this.windowRef.nativeWindow.sessionStorage.removeItem(sessionKey);
    // Timeout prevents ExpressionChangedAfterItHasBeenCheckedError:
    setTimeout(() =>
      this.windowRef.nativeWindow.dispatchEvent(
        new CustomEvent('kirbyToggleDummyKeyboard', { detail: this.showDummyKeyboard })
      )
    );
  }

  @HostListener('window:kirbyToggleDummyKeyboard', ['$event.detail'])
  _onToggleDummyKeyboard(show: boolean) {
    if (this.showDummyKeyboard !== undefined) {
      this.showDummyKeyboard = show;
    }
  }

  toggleShowPageProgress(show: boolean) {
    if (this.preventChangeEvent) return;
    this.showPageProgress = show;
    this.showPageProgressChange.emit(this.showPageProgress);
  }

  toggleShowFooter(show: boolean) {
    if (this.preventChangeEvent) return;
    this.showFooter = show;
    this.showFooterChange.emit(this.showFooter);
  }

  toggleDisplayFooterAsInline(value: boolean) {
    if (this.preventChangeEvent) return;
    this.displayFooterAsInline = value;
    this.displayFooterAsInlineChange.emit(this.displayFooterAsInline);
  }

  toggleCollapseTitle(value: boolean) {
    if (this.preventChangeEvent) return;
    this.collapseTitle = value;
    this.collapseTitleChange.emit(this.collapseTitle);
  }

  toggleAlertBeforeClose(value: boolean) {
    if (this.preventChangeEvent) return;
    this.alertBeforeClose = value;
    this.alertBeforeCloseChange.emit(this.alertBeforeClose);
  }

  toggleShowDummyContent(show: boolean) {
    this.showDummyContent = show;
    this.showDummyContentChange.emit(this.showDummyContent);
  }

  toggleDelayLoadDummyContent(show: boolean) {
    if (this.preventChangeEvent) return;
    this.delayLoadDummyContent = show;
    this.delayLoadDummyContentChange.emit(this.delayLoadDummyContent);
  }

  toggleLoadAdditionalContent(show: boolean) {
    if (this.preventChangeEvent) return;
    this.loadAdditionalContent = show;
    this.loadAdditionalContentChange.emit(this.loadAdditionalContent);
  }

  toggleDisableScroll(show: boolean) {
    if (this.preventChangeEvent) return;
    this.disableScroll = show;
    this.disableScrollChange.emit(this.disableScroll);
  }

  toggleInteractWithBackground(show: boolean) {
    this.preventChangeEvent = true;
    this.interactWithBackground = show;
    this.toggleCustomCssClass(show);
    if (show) {
      this.toggleShowDummyContent(true);
    }
    this.interactWithBackgroundChange.emit(show);
    setTimeout(() => (this.preventChangeEvent = false));
  }

  toggleCustomCssClass(show: boolean) {
    this.customCssClass = show;
    this.customCssClassChange.emit(show);
  }

  toggleSnapFooterToKeyboard(show: boolean) {
    this.snapFooterToKeyboard = show;
    this.snapFooterToKeyboardChange.emit(show);
  }
}
