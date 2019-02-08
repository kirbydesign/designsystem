import { Component, OnInit, Input, HostBinding } from '@angular/core';

enum verticalAlignmentEnum {
  top = 'flex-start',
  center = 'center',
  bottom = 'flex-end'
}
enum horisontalAlignmentEnum {
  left = 'flex-start',
  center = 'center',
  right = 'flex-end'
}
type horisontalAlignment = 'left' | 'center' | 'right';
type verticalAlignment = 'top' | 'center' | 'bottom';

@Component({
  selector: 'kirby-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss']
})
export class ListCellComponent implements OnInit {
  @Input() lineOne: string | number;
  @Input() lineTwo: string | number;
  @Input() lineThree: string | number;
  @Input() horisontalAlignment: horisontalAlignment;
  @Input() verticalAlignment: verticalAlignment;
  @Input() width: number;

  @HostBinding('style.flex-basis')
  private _flexBasisHost: string;
  @HostBinding('style.justify-content')
  private _flexJustifyHost: string;
  @HostBinding('style.align-items')
  private _flexAlignHost: string;

  constructor() {}

  ngOnInit() {
    this.setStyle();
  }

  private setStyle() {
    if (this.width) {
      this._flexBasisHost = `${this.width * 100}%`;
    }
    if (this.verticalAlignment) {
      this._flexJustifyHost = verticalAlignmentEnum[this.verticalAlignment];
    }
    if (this.horisontalAlignment) {
      this._flexAlignHost = horisontalAlignmentEnum[this.horisontalAlignment];
    }
  }
}
