import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { PlatformService } from '../../helpers';
import { OpenState } from '../../models';
import { ButtonComponent } from '../button/button.component';
import { ModalController } from '../modal';

import { ActionSheetConfig } from './config/action-sheet-config';
import { ActionSheetItem } from './config/action-sheet-item';

@Component({
  selector: 'kirby-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent {
  private state: OpenState.closed | OpenState.open = OpenState.closed;
  attentionLevel: '2' | '3' = '3';

  constructor(
    private platform: PlatformService,
    private modalController: ModalController,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  @Input() cancelButtonText = 'Cancel';
  @Input() disabled: boolean = false;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Input() triggerIconName = 'more';
  @Input() triggerText?: string;
  @Output() itemSelect: EventEmitter<ActionSheetItem> = new EventEmitter<ActionSheetItem>();
  @Input() tabindex = 0;

  @HostBinding('attr.tabindex')
  get _tabindex() {
    return this.disabled ? -1 : this.tabindex;
  }

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return this.state === OpenState.open;
  }

  isTouch = this.platform.isTouch();

  onItemSelect(selection: ActionSheetItem) {
    this.itemSelect.emit(selection);
    this.state = OpenState.closed;
  }

  @HostListener('blur')
  _onBlur() {
    this.toggle();
  }

  onButtonMouseEvent(event: Event) {
    // avoid button focus
    event.preventDefault();
  }

  onToggleSheet(event: Event) {
    event.stopPropagation();
    if (!this.isOpen) {
      this.elementRef.nativeElement.focus();
    }
    this.toggle();
  }

  toggle() {
    if (this.isTouch) {
      const config: ActionSheetConfig = {
        header: this.header,
        subheader: this.subheader,
        cancelButtonText: this.cancelButtonText,
        items: this.items,
      };
      this.modalController.showActionSheet(config);
      return;
    }
    this.state = this.state === OpenState.open ? OpenState.closed : OpenState.open;
    this.attentionLevel = this.state === OpenState.open ? '2' : '3';
  }

  @ContentChild(ButtonComponent) customButton: ButtonComponent;
}
