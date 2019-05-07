import { Component, Input, OnChanges } from '@angular/core';

import { FabSheetConfig } from './config/fab-sheet-config';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements OnChanges {
  @Input() config: FabSheetConfig;
  private isFabSheetOpen: boolean = false;

  ngOnChanges() {
    // set default values if not set from component
    this.config.disabled = this.config.disabled === undefined ? false : this.config.disabled;
  }

  public get iconName(): string {
    if (!this.config) {
      return 'cog';
    }
    const openIconName = !this.config.openIconName ? 'cog' : this.config.openIconName;
    const closeIconName = !this.config.closeIconName ? 'close' : this.config.closeIconName;

    return this.isFabSheetOpen ? closeIconName : openIconName;
  }

  public handleFabSheet() {
    if (!this.config.disabled) {
      if (this.isFabSheetOpen) {
        this.closeFabSheet();
      } else {
        this.openFabSheet();
      }
    }
  }

  private openFabSheet() {
    this.isFabSheetOpen = true;
  }

  private closeFabSheet() {
    this.isFabSheetOpen = false;
  }
}
