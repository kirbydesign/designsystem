import { Component, OnInit, NgZone, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScssHelper } from '../../scss/scss-helper';
import { BreakpointHelperService } from './breakpoint-helper.service';
import { GridCardConfiguration } from './grid-card-configuration';

class GridCard {
  configuration: GridCardConfiguration;
  row: number;
  col: number;
  colSpan: number;
  constructor(configuration: GridCardConfiguration, row: number, col: number, colSpan: number) {
    this.configuration = configuration;
    this.row = row;
    this.col = col;
    this.colSpan = colSpan;
  }
}

@Component({
  selector: 'kirby-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  cardConfigs: GridCardConfiguration[];
  cards: GridCard[];
  rows = '';
  columns = '';
  private breakpointSubscription: Subscription;

  constructor(private breakpointHelper: BreakpointHelperService) { }

  @Input()
  set cardConfigurations(cardConfigurations: GridCardConfiguration[]) {
    this.cardConfigs = cardConfigurations;
    this.configureGrid();
  }

  /**
   * This is where the magic happens, a.k.a. the logic that determins
   * which cards will be two column and which will be only one.
   */
  configureGrid() {
    const numberOfColumns = this.breakpointHelper.currentScreenWidth >= ScssHelper.BREAKPOINT_SCREEN_L ? 2 : 1;
    this.rows = '';
    this.cards = [];
    let currentRow = 0;
    let currentColumn = 0;
    let onlyOneColumn = true;
    this.cardConfigs.forEach((cardConfig, idx) => {
      if (numberOfColumns === 1) {
        // Simple, we only have one column always
        this.cards.push(new GridCard(cardConfig, currentRow, currentColumn, 1));
        this.addRowToGrid();
        currentRow++;
      } else {
        if (currentColumn > 0) {
          // We are already on column 2, so yeah just add it
          this.cards.push(new GridCard(cardConfig, currentRow, currentColumn, 1));
          this.addRowToGrid();
          currentColumn = 0;
          currentRow++;
        } else if (this.cardConfigs.length === idx + 1) {
          // Last row man, take all the space
          this.cards.push(new GridCard(cardConfig, currentRow, currentColumn, 2));
          this.addRowToGrid();
        } else {
          if (cardConfig.preferredSize === 2) {
            // Ok, we are on column 1 and not the last card, so we honor preferredSize === 2
            this.cards.push(new GridCard(cardConfig, currentRow, currentColumn, 2));
            this.addRowToGrid();
            currentRow++;
          } else {
            // Uh, we are on column 1 and not the last card, so we honor preferredSize === 1
            this.cards.push(new GridCard(cardConfig, currentRow, currentColumn, 1));
            currentColumn++;
            onlyOneColumn = false;
          }
        }
      }
    });

    if (onlyOneColumn) {
      this.columns = '*';
    } else {
      this.columns = '*,*';
    }
  }

  addRowToGrid() {
    if (this.rows) {
      this.rows = this.rows + ',auto';
    } else {
      this.rows = 'auto';
    }
  }

  ngOnInit() {
    this.breakpointSubscription = this.breakpointHelper.observe().subscribe(
      () => this.configureGrid()
    );
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

}
