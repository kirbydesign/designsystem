import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
} from '@angular/core';

import { FabSheetConfig } from './config/fab-sheet-config';

@Component({
  selector: 'kirby-fab-sheet',
  templateUrl: './fab-sheet.component.html',
  styleUrls: ['./fab-sheet.component.scss'],
})
export class FabSheetComponent implements OnChanges {
  @Input() config: FabSheetConfig;
  @Output() actionSelected = new EventEmitter<string>();
  public isFabSheetOpen: boolean = false;

  constructor(private _elementRef: ElementRef) {}

  ngOnChanges() {
    // set default values if not set from component
    this.config.disabled = this.config.disabled === undefined ? false : this.config.disabled;
  }

  public get iconName(): string {
    if (!this.config) {
      return 'cog';
    }
    const openIconName = !this.config.openIconName ? 'cog' : this.config.openIconName;

    return this.isFabSheetOpen ? 'close' : openIconName;
  }

  public handleFabSheet() {
    if (!this.config.disabled) {
      this.isFabSheetOpen = !this.isFabSheetOpen;
    }
  }

  public onItemSelect(selection: string) {
    this.actionSelected.emit(selection);
    this.isFabSheetOpen = false;
  }

  public get verticalPos(): number {
    if (this.config.verticalAlignment && this.config.verticalAlignment === 'bottom') {
      return 74;
    }

    if (this.config.actions) {
      let yPos = this.config.actions.length * 64 + 10;

      if (this.config.header || this.config.subheader) {
        const headerHeight = document.getElementsByClassName('action-sheet-card-header')[0]
          .clientHeight;
        yPos += headerHeight;
      }
      return yPos * -1;
    } else {
      return 74;
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isFabSheetOpen = false;
    }
  }
}
