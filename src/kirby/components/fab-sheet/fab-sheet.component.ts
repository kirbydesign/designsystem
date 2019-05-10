import {
  Component,
  Input,
  EventEmitter,
  Output,
  ContentChild,
  AfterViewInit,
  ViewContainerRef,
} from '@angular/core';

import { ActionSheetConfig } from '~/kirby/components/modal/action-sheet/config/action-sheet-config';
import { ModalController } from './../modal/services/modal.controller';
import { IconComponent, IconNames } from './../icon/icon.component';
import { ActionSheetItem } from '../modal/action-sheet/config/action-sheet-item';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements AfterViewInit {
  @Input() disabled?: boolean = false;
  @Input() horizontalAlignment?: 'left' | 'center' | 'right' = 'right';
  @Input() header?: string;
  @Input() subheader?: string;
  @Input() items: Array<ActionSheetItem>;
  @Output() actionSelected = new EventEmitter<ActionSheetItem>();
  @ContentChild(IconComponent) icon: IconComponent;
  public isFabSheetOpen: boolean = false;
  private originalIconName: IconNames;

  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  ngAfterViewInit() {
    this.originalIconName = this.icon.name;
  }

  public openFabSheet(event) {
    if (!this.disabled) {
      if (!this.isFabSheetOpen) {
        this.isFabSheetOpen = true;
        this.icon.name = this.isFabSheetOpen ? 'close' : this.originalIconName;
        const rect = event.currentTarget.getBoundingClientRect();
        const config: ActionSheetConfig = {
          header: this.header,
          subheader: this.subheader,
          items: this.items,
          position: this.calculatPosition(rect),
        };

        this.modalController.showActionSheet(config, this.vcRef, this.onActionSelected.bind(this));
      } else {
        this.modalController.hideTopmost();
      }
    }
  }

  private onActionSelected(selection: ActionSheetItem) {
    this.actionSelected.emit(selection);
    this.icon.name = this.originalIconName;
    this.isFabSheetOpen = false;
  }

  private calculatPosition(rect: DOMRect): { position: string; top: string; left: string } {
    const topOffset = 10;
    const fabWidth = 64;
    const cardWidth = 304;

    let position = {
      position: 'absolute',
      top: rect.y + rect.height + topOffset + 'px',
      left: rect.x - cardWidth + fabWidth + 'px',
    };

    if (this.horizontalAlignment) {
      if (this.horizontalAlignment === 'left') {
        position.left = rect.x + 'px';
      } else if (this.horizontalAlignment === 'center') {
        const width = cardWidth / 2 - fabWidth / 2;
        position.left = rect.x - width + 'px';
      }
    }
    return position;
  }
}
