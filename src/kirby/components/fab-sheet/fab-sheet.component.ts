import {
  Component,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
  ContentChild,
  AfterViewInit,
} from '@angular/core';

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

  constructor(private _elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.originalIconName = this.icon.name;
  }

  ngOnChanges() {
    // set default values if not set from component
    this.config.disabled = this.config.disabled === undefined ? false : this.config.disabled;
  }

  public handleFabSheet() {
    if (!this.config.disabled) {
      this.isFabSheetOpen = !this.isFabSheetOpen;
      this.icon.name = this.isFabSheetOpen ? 'close' : this.originalIconName;
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

    if (this.config.actionSheetConfig.actions) {
      let yPos = this.config.actionSheetConfig.actions.length * 64 + 10;

      if (this.config.actionSheetConfig.header || this.config.actionSheetConfig.subheader) {
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
