import { Component, EventEmitter, HostListener, Input, NgZone, Output } from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types/window-ref';

@Component({
  selector: 'cookbook-modal-example-configuration',
  templateUrl: './modal-example-configuration.component.html',
  styleUrls: ['./modal-example-configuration.component.scss'],
})
export class ModalExampleConfigurationComponent {
  @Input() showDummyKeyboard: boolean;
  @Output() showDummyKeyboardChange = new EventEmitter<boolean>();

  @Input() showFooter: boolean;
  @Output() showFooterChange = new EventEmitter<boolean>();

  @Input() showDummyContent: boolean;
  @Output() showDummyContentChange = new EventEmitter<boolean>();

  @Input() delayLoadDummyContent: boolean;
  @Output() delayLoadDummyContentChange = new EventEmitter<boolean>();

  @Input() loadAdditionalContent: boolean;
  @Output() loadAdditionalContentChange = new EventEmitter<boolean>();

  @Input() disableScroll: boolean;
  @Output() disableScrollChange = new EventEmitter<boolean>();

  constructor(private window: WindowRef, zone: NgZone) {}

  toggleDummyKeyboard() {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard
      ? this.window.sessionStorage.setItem(sessionKey, 'true')
      : this.window.sessionStorage.removeItem(sessionKey);
    // Timeout prevents ExpressionChangedAfterItHasBeenCheckedError:
    setTimeout(() =>
      this.window.dispatchEvent(
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

  toggleShowFooter(show: boolean) {
    this.showFooter = show;
    this.showFooterChange.emit(this.showFooter);
  }

  toggleShowDummyContent(show: boolean) {
    this.showDummyContent = show;
    this.showDummyContentChange.emit(this.showDummyContent);
  }

  toggleDelayLoadDummyContent(show: boolean) {
    this.delayLoadDummyContent = show;
    this.delayLoadDummyContentChange.emit(this.delayLoadDummyContent);
  }

  toggleLoadAdditionalContent(show: boolean) {
    this.loadAdditionalContent = show;
    this.loadAdditionalContentChange.emit(this.loadAdditionalContent);
  }

  toggleDisableScroll(show: boolean) {
    this.disableScroll = show;
    this.disableScrollChange.emit(this.disableScroll);
  }
}
