import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  ContentChild,
  AfterViewInit,
  ViewContainerRef,
} from '@angular/core';

import { ModalController } from './../modal/services/modal.controller';
import { IconComponent, IconNames } from './../icon/icon.component';
import { FabSheetConfig } from './config/fab-sheet-config';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements OnChanges, AfterViewInit {
  @Input() config: FabSheetConfig;
  @Output() actionSelected = new EventEmitter<string>();
  @ContentChild(IconComponent) icon: IconComponent;
  public isFabSheetOpen: boolean = false;
  private originalIconName: IconNames;

  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  ngAfterViewInit() {
    this.originalIconName = this.icon.name;
  }

  ngOnChanges() {
    this.config.disabled = this.config.disabled === undefined ? false : this.config.disabled;
  }

  public openFabSheet(event) {
    if (!this.config.disabled) {
      if (!this.isFabSheetOpen) {
        const rect = event.currentTarget.getBoundingClientRect();
        this.isFabSheetOpen = true;
        this.icon.name = this.isFabSheetOpen ? 'close' : this.originalIconName;

        this.config.actionSheetConfig.position = this.calculatPosition(rect);
        this.modalController.openActionSheet(
          this.config.actionSheetConfig,
          this.vcRef,
          this.onActionSelected.bind(this)
        );
      } else {
        this.modalController.closeTopmost();
      }
    }
  }

  private calculatPosition(rect): any {
    const topOffset = 10;
    const fabWidth = 64;
    const cardWidth = 304;

    let position = {
      position: 'absolute',
      top: rect.y + rect.height + topOffset + 'px',
      left: rect.x - cardWidth + fabWidth + 'px',
    };

    if (this.config.horizontalAlignment) {
      if (this.config.horizontalAlignment === 'left') {
        position.left = rect.x + 'px';
      } else if (this.config.horizontalAlignment === 'center') {
        const width = cardWidth / 2 - fabWidth / 2;
        position.left = rect.x - width + 'px';
      }
    }
    return position;
  }

  private onActionSelected(selection: string) {
    this.actionSelected.emit(selection);
    this.icon.name = this.originalIconName;
    this.isFabSheetOpen = false;
  }
}
