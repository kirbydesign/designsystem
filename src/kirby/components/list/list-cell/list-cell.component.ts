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
  private readonly horisontalAlignmentDefault: horisontalAlignment = 'left';
  private readonly verticalAlignmentDefault: verticalAlignment = 'center';
  private readonly widthDefault = 1;

  @Input() horisontalAlignment: horisontalAlignment = this
    .horisontalAlignmentDefault;
  @Input() verticalAlignment: verticalAlignment = this.verticalAlignmentDefault;
  @Input() width = this.widthDefault;

  @HostBinding('style.flex-basis')
  private _flexBasisHost: string;
  @HostBinding('style.align-items')
  private _flexAlignHost: string;
  @HostBinding('style.justify-content')
  private _flexJustifyHost: string;

  constructor() {}

  ngOnInit() {
    this.setStyle();
  }

  private setStyle() {
    this._flexBasisHost = this.getWidth();
    this._flexAlignHost = this.getAlignItems();
    this._flexJustifyHost = this.getJustifyContent();
  }

  getWidth(): string {
    if (this.width && this.width > 0) {
      return `${this.width * 100}%`;
    }
    console.warn(
      `Invalid value ${
        this.width
      } for width. Valid values numbers > 0. Defaulting to '${
        this.widthDefault
      }'`
    );
    return '100%';
  }

  getAlignItems(): string {
    if (
      this.horisontalAlignment &&
      horisontalAlignmentEnum[this.horisontalAlignment]
    ) {
      return horisontalAlignmentEnum[this.horisontalAlignment];
    }
    console.warn(
      `Invalid value ${
        this.horisontalAlignment
      } for horisontalAlignment. Valid values are 'left', 'center', 'right'. Defaulting to '${
        this.horisontalAlignmentDefault
      }'`
    );
    return horisontalAlignmentEnum[this.horisontalAlignmentDefault];
  }

  getJustifyContent(): string {
    if (
      this.verticalAlignment &&
      verticalAlignmentEnum[this.verticalAlignment]
    ) {
      return verticalAlignmentEnum[this.verticalAlignment];
    }
    console.warn(
      `Invalid value ${
        this.verticalAlignment
      } for verticalAlignment. Valid values are 'top', 'center', 'bottom'. Defaulting to '${
        this.verticalAlignmentDefault
      }'`
    );
    return verticalAlignmentEnum[this.verticalAlignmentDefault];
  }
}
