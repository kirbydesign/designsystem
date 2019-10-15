import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
  styleUrls: ['./grid.component.scss'],
  // tslint:disable-next-line
  host: { '[attr.max-columns]': 'maxColumns' },
})
export class GridComponent implements OnInit, OnDestroy {
  cardConfigs: GridCardConfiguration[];
  cards: GridCard[] = [];
  rows = 'auto,'; // Used in {N}'s gridlayout
  columns = '*,'; // Used in {N}'s gridlayout
  private breakpointSubscription: Subscription;

  @Input() maxColumns: number;

  @Input()
  set cardConfigurations(cardConfigurations: GridCardConfiguration[]) {
    this.cardConfigs = cardConfigurations;
    // TODO TRM/JEO Remove this when breakpoint observe something something...
    this.configureGrid();
  }

  constructor(private breakpointHelper: BreakpointHelperService) {}

  configureGrid() {
    let calculatedMaxColumns = 0;
    if (this.maxColumns === undefined) {
      calculatedMaxColumns =
        this.breakpointHelper.currentScreenWidth >= ScssHelper.BREAKPOINT_SCREEN_L ? 2 : 1;
    } else {
      calculatedMaxColumns = this.maxColumns;
    }
    this.cards = [];
    this.rows = 'auto, ';
    this.columns = '*, ';
    let columnCounter = 0;
    let currentRow = 0;
    let currentColumn = 0;

    this.cardConfigs.forEach((card, index) => {
      // Cards colspan is added to the column counter
      columnCounter += card.preferredSize;
      // If only maxColumns are set to 1, just add all cards with a colspan of 1
      if (calculatedMaxColumns === 1) {
        this.cards.push(new GridCard(card, currentRow, currentColumn, 1));
        currentRow += 1;
        return;
      }
      // If we are below maxColumns, then add the card to the array
      if (columnCounter <= calculatedMaxColumns) {
        this.cards.push(new GridCard(card, currentRow, currentColumn, card.preferredSize));
        // Update currentColumn, so the next card will be placed correctly
        currentColumn += card.preferredSize;
      } else {
        // The new card didn't fit - Calculate remaining columns for previous card
        const restColumns = calculatedMaxColumns - (columnCounter - card.preferredSize);
        const prevCard = this.cards[index - 1];
        // Add the restColumns to the previous cards colspan, to make it span out
        prevCard.colSpan = restColumns + prevCard.colSpan;
        // We are now on a new row
        currentRow += 1;
        currentColumn = 0;
        this.cards.push(new GridCard(card, currentRow, currentColumn, card.preferredSize));
        // Update currentColumn to match the size of the new card and reset columnCounter
        currentColumn = card.preferredSize;
        columnCounter = card.preferredSize;
      }
      // If we on the last card, make sure it spans all the rest of the columns
      if (this.cardConfigs.length - 1 === index) {
        const restColumns = calculatedMaxColumns - columnCounter;
        const currentCard = this.cards[index];
        currentCard.colSpan += restColumns;
      }
    });
    // Update the rows and columns string to match the calculated sizes (Only used by {N} GridLayout)
    this.rows = this.rows.repeat(currentRow) + 'auto';
    this.columns = this.columns.repeat(calculatedMaxColumns);
  }

  ngOnInit() {
    // this.breakpointSubscription = this.breakpointHelper.observe().subscribe(() => {
    //   this.configureGrid();
    // });
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
