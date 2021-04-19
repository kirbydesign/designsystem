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

  private toggle() {
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
    }
  }
}
