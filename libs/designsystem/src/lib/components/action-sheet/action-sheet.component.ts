import { Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';

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

  constructor(private platform: PlatformService, private modalController: ModalController) {}

  @Input() cancelButtonText = 'Cancel';
  @Input() hideCancel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() header: string;
  @Input() subheader: string;
  @Input() items: Array<ActionSheetItem>;
  @Input() triggerIconName = 'more';
  @Input() triggerText?: string;
  @Output() cancel = new EventEmitter();
  @Output() itemSelect: EventEmitter<ActionSheetItem> = new EventEmitter<ActionSheetItem>();

  @HostBinding('class.is-open')
  get isOpen(): boolean {
    return this.state === OpenState.open;
  }

  onItemSelect(selection: ActionSheetItem) {
    this.itemSelect.emit(selection);
    this.state = OpenState.closed;
  }

  onCancel() {
    this.cancel.emit();
  }

  delayedClose() {
    setTimeout(() => {
      this.state = OpenState.closed;
    }, 500);
  }

  onToggleSheet() {
    if (this.platform.isTouch()) {
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
