import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { PlatformService } from '../../helpers/platform.service';
import { OpenState } from '../../models/open-state';
import { ModalController } from '../modal/services/modal.controller';

import { ActionSheetConfig } from './config/action-sheet-config';
import { ActionSheetItem } from './config/action-sheet-item';

@Component({
  selector: 'kirby-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent implements OnInit {
  private state = OpenState.closed;
  _attentionLevel: '2' | '3' = '3';
  _isTouch: boolean;
  _focusedIndex = -1;
  static readonly OPEN_DELAY_IN_MS = 100;

  constructor(
    private platform: PlatformService,
    private modalController: ModalController,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this._isTouch = this.platform.isTouch();
  }

  @Input() cancelButtonText = 'Cancel';
  @Input() disabled = false;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Input() iconName = 'more';
  @Input() buttonText?: string;
  @Output() itemSelect: EventEmitter<ActionSheetItem> = new EventEmitter<ActionSheetItem>();
  @Input() tabindex = 0;
  @Input() hideButton? = false;
  @Input() hideCancel = !this.hideButton;

  @HostBinding('attr.tabindex')
  get _tabindex() {
    return this.disabled ? -1 : this.tabindex;
  }

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return this.state === OpenState.open;
  }

  @HostBinding('class.has-button')
  get hasButton(): boolean {
    return !this.hideButton;
  }

  _onItemSelect(selection: ActionSheetItem) {
    this.itemSelect.emit(selection);
    this.close();
  }

  @HostListener('blur')
  _onBlur() {
    this.close();
  }

  _onButtonMouseEvent(event: Event) {
    // avoid button focus
    event.preventDefault();
  }

  _onToggleSheet(event: Event) {
    event.stopPropagation();
    if (!this.isOpen) {
      this.elementRef.nativeElement.focus();
    }
    this.toggle();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (this.disabled) return;

    if (this._isTouch) {
      const config: ActionSheetConfig = {
        header: this.header,
        subheader: this.subheader,
        cancelButtonText: this.cancelButtonText,
        items: this.items,
      };
      this.modalController.showActionSheet(config);
      return;
    }

    this.state = OpenState.opening;
    setTimeout(() => {
      this.state = OpenState.open;
      this._attentionLevel = '2';
    }, ActionSheetComponent.OPEN_DELAY_IN_MS);
  }

  close() {
    if (this.disabled) return;

    if (this.isOpen) {
      this.state = OpenState.closed;
      this._attentionLevel = '3';
      this._focusedIndex = -1;
    }
  }

  @HostListener('keydown.space', ['$event'])
  _onSpace(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isOpen) {
      this.open();
    }
  }

  @HostListener('keydown.escape', ['$event'])
  _onEscape(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isOpen) {
      this.close();
    }
  }

  @HostListener('keydown.enter', ['$event'])
  _onEnter(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isOpen && this._focusedIndex > -1) {
      this._onItemSelect(this.items[this._focusedIndex]);
      return;
    }
    this.toggle();
  }

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  _onArrowKeys(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }
    if (this.isOpen && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      // Mirror default HTML5 select behaviour - prevent left/right arrows when open:
      return;
    }
    event.preventDefault();
    let newIndex = -1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      // Select previous item:
      newIndex = this._focusedIndex - 1;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (this._focusedIndex === -1) {
        // None selected, select first item:
        newIndex = 0;
      } else if (this._focusedIndex < this.items.length - 1) {
        // Select next item:
        newIndex = this._focusedIndex + 1;
      }
    }

    if (newIndex > -1) {
      this._focusedIndex = newIndex;
    }
  }

  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  _onHomeEndKeys(event: KeyboardEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    let newIndex = -1;
    if (event.key === 'Home') {
      // Select first item:
      newIndex = 0;
    }
    if (event.key === 'End') {
      // Select last item:
      newIndex = this.items.length - 1;
    }
    if (newIndex > -1) {
      this._focusedIndex = newIndex;
    }
  }
}
