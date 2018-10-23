import {  Component,
          OnInit,
          OnDestroy,
          Input,
          Output,
          EventEmitter,
          ViewChild,
          ElementRef,
          AfterViewChecked,
        } from '@angular/core';

@Component({
  selector: 'kirby-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  // State of the modal - called from another component, e.g. a button
  private _isOpen = false;

  @Input() size?: 'small' | 'medium' | 'large';
  // Theme option - e.g. dark, light or whatever theme there is
  @Input() theme?: string;
  modalCssClasses: {};
  // Output closing state
  @Output() closingModal = new EventEmitter();
  // Pointer to modal DOM element
  private activeModal: ElementRef;
  // isFocus flag to prevent ngAfterViewChecked from running multiple times
  private isFocus: boolean;
  // Remember which element had focus before opening the modal
  private oldFocus: HTMLElement;

  @ViewChild('activeModal') set content(content: ElementRef) {
    this.activeModal = content;
  }

  ngOnInit() {
    const { theme } = this;
    let { size } = this;

    if (size === void 0) {
      size = 'medium';
    }
    this.modalCssClasses = {
      ['modal--' + size]: size,
      ['theme--' + theme] : theme,
    };
    this.keydownHandler = this.keydownHandler.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keydownHandler, false);
    document.removeEventListener('keyup', this.keyupHandler, false);
  }

  ngAfterViewChecked() {
    if (this.activeModal !== undefined && !this.isFocus) {
      this.oldFocus = <HTMLElement>document.activeElement;
      const focusableElms: HTMLElement[] = this._getFocusableChildren(this.activeModal.nativeElement);

      if (focusableElms.length) {
        focusableElms[0].focus();
      }

      this.isFocus = true;
    }
  }

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (this._isOpen) {
      document.addEventListener('keydown', this.keydownHandler, false);
      document.addEventListener('keyup', this.keyupHandler, false);
    } else {
      document.removeEventListener('keydown', this.keydownHandler, false);
      document.removeEventListener('keyup', this.keyupHandler, false);
    }
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  closeModal() {
    this._isOpen = false;
    this.isFocus = false;
    this.closingModal.emit();
    this.oldFocus.focus();
  }

  _getFocusableChildren(elm: HTMLElement): HTMLElement[] {
    const focusableElements = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'];
    const focusElements: HTMLElement[] = Array.from(elm.querySelectorAll(focusableElements.join()));
    // Filter out none-visible elements
    return focusElements.filter((child: HTMLElement) => !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length));
  }

  _trapTabKey(evt) {
    const elm = this.activeModal.nativeElement;
    const focusableChildren = this._getFocusableChildren(elm);
    const focusedItemIndex = focusableChildren.indexOf(<HTMLElement>document.activeElement);

    if (evt.shiftKey && focusedItemIndex === 0) {
      (<HTMLElement>focusableChildren[focusableChildren.length - 1]).focus();
      event.preventDefault();
    } else if (!evt.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
      (<HTMLElement>focusableChildren[0]).focus();
      event.preventDefault();
    }
  }

  keyupHandler(evt: KeyboardEvent) {
    // Check for ESCAPE key press
    if (evt.keyCode === 27 && this._isOpen) {
      // Don't close modal if the active element is an input field.
      if (document.activeElement.nodeName.toLowerCase() === 'input' &&
          (<HTMLInputElement>document.activeElement).type !== 'checkbox' &&
          (<HTMLInputElement>document.activeElement).type !== 'radio') {
        return false;
      }
      this.closeModal();
    }
  }

  keydownHandler(evt: KeyboardEvent) {
    // Check for TAB key press
    if (evt.keyCode === 9 && this._isOpen) {
      // Make sure we don't tab outside for the Modal
      this._trapTabKey(evt);
    }
  }
}
