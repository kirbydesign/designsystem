import { Component, OnInit, NgZone, Input } from '@angular/core';

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

export class GridComponent implements OnInit {
  cardConfigs: GridCardConfiguration[];
  cards: GridCard[];
  rows = '';
  columns = '';

  constructor(private zone: NgZone, private breakpointHelper: BreakpointHelperService) { }

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
    this.cards = null;
    let currentRow = 0;
    let currentColumn = 0;
    let onlyOneCoulmn = true;
    this.cardConfigs.forEach((cardConfig, idx) => {
      if (numberOfColumns === 1) {
        // Simple, we only have one column always
        this.addCard(new GridCard(cardConfig, currentRow, currentColumn, 1));
        this.addRowToGrid();
        currentRow++;
      } else {
        if (currentColumn > 0) {
          // We are already on column 2, so yeah just add it
          this.addCard(new GridCard(cardConfig, currentRow, currentColumn, 1));
          this.addRowToGrid();
          currentColumn = 0;
          currentRow++;
        } else if (this.cardConfigs.length === idx + 1) {
          // Last row man, take all the space
          this.addCard(new GridCard(cardConfig, currentRow, currentColumn, 2));
          this.addRowToGrid();
        } else {
          if (cardConfig.preferredSize === 2) {
            // Ok, we are on column 1 and not the last card, so we honor preferredSize === 2
            this.addCard(new GridCard(cardConfig, currentRow, currentColumn, 2));
            this.addRowToGrid();
            currentRow++;
          } else {
            // Uh, we are on column 1 and not the last card, so we honor preferredSize === 1
            this.addCard(new GridCard(cardConfig, currentRow, currentColumn, 1));
            currentColumn++;
            onlyOneCoulmn = false;
          }
        }
      }
    });

    // Run the last update in the zone, to make sure Angular data binding is informed of this
    // This is really only needed for orientation changes, so yeah native, but it does not hurt web
    this.zone.run(() => {
      if (onlyOneCoulmn) {
        this.columns = '*';
      } else {
        this.columns = '*,*';
      }
    });
  }

  addCard(card: GridCard) {
    if (this.cards) {
      this.cards.push(card);
    } else {
      this.cards = [card];
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
    // The constant here is because of some scope that is outside the scope of my knowledge, so it stays here!
    const initCallback = (): void => {
      this.configureGrid();
    };
    this.breakpointHelper.onInit(initCallback);
  }

}
