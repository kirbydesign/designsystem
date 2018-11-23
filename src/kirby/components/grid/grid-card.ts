import { GridCardConfiguration } from './grid-card-configuration';


export class GridCard {
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
