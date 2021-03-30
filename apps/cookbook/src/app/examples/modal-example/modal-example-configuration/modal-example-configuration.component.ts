import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  Output,
} from '@angular/core';

import { WindowRef } from '@kirbydesign/designsystem/types/window-ref';

@Component({
  selector: 'cookbook-modal-example-configuration',
  templateUrl: './modal-example-configuration.component.html',
  styleUrls: ['./modal-example-configuration.component.scss'],
})
export class ModalExampleConfigurationComponent {
  @Input() showDummyKeyboard: boolean;
  @Output() showDummyKeyboardChange = new EventEmitter<boolean>();

  @Input() showPageProgress: boolean;
  @Output() showPageProgressChange = new EventEmitter<boolean>();

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

  @Input() openFullHeight: boolean;
  @Output() openFullHeightChange = new EventEmitter<boolean>();

  @Input() interactWithBackground: boolean;
  @Output() interactWithBackgroundChange = new EventEmitter<boolean>();

  @Input() invertColors: boolean;
  @Output() invertColorsChange = new EventEmitter<boolean>();

  @HostBinding('class.checkbox-xs') true; // Extra small checkboxes

  constructor(private window: WindowRef, zone: NgZone) {}

  toggleDummyKeyboard(show: boolean) {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard = show;
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

  toggleShowPageProgress(show: boolean) {
    this.showPageProgress = show;
    this.showPageProgressChange.emit(this.showPageProgress);
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

  toggleOpenFullHeight(show: boolean) {
    this.openFullHeight = show;
    this.openFullHeightChange.emit(this.openFullHeight);
  }

  toggleInteractWithBackground(show: boolean) {
    this.interactWithBackground = show;
    this.interactWithBackgroundChange.emit(show);
  }

  toggleInvertColors(show: boolean) {
    this.invertColors = show;
    this.invertColorsChange.emit(show);
  }
}
