import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'kirby-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
})
export class YearSelectorComponent implements OnInit {
  private _activeYear: number;
  private _minYear: number;
  private _maxYear: number;

  public selectableDates: number[] = [];

  @HostBinding('class.height')
  @Input()
  height: string;

  @Input() set minYear(value: string) {
    if (value === undefined || value === '') return;
    console.log('value', typeof value);
    this._minYear = new Date(value).getFullYear();
    console.log('set this._minYear', this._minYear);
    this.calculateYearRange();
  }

  @Input() set maxYear(value: string) {
    if (value === undefined || value === '') return;
    this._maxYear = new Date(value).getFullYear();
    console.log('set this._maxYear', this._maxYear);
    this.calculateYearRange();
  }

  get activeYear(): string {
    return this._activeYear.toString(10);
  }

  @Input()
  set activeYear(value: string) {
    this._activeYear = Number(value);
    this.activeYearChange.emit(value);
  }
  @Output()
  activeYearChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    const currentDate: Date = new Date();
    this.activeYear = currentDate.getFullYear().toString(10);
    this._minYear = this._activeYear;
    this._maxYear = this._activeYear + 1;
    this.calculateYearRange();
  }

  private calculateYearRange(): void {
    this.selectableDates = [];

    if (this._minYear > this._maxYear) return;
    for (let i = this._minYear; i <= this._maxYear; i++) {
      this.selectableDates.push(i);
    }
  }

  ngOnInit(): void {}

  public isItemSelected(item: number): boolean {
    return this.activeYear === item.toString(10);
  }
  onItemSelect(item: any) {
    this.activeYear = item.toString(10);
  }
}
