import { Component, OnInit, Input, HostBinding } from '@angular/core';

enum verticalAlignmentEnum {
  top = 'flex-start',
  center = 'center',
  bottom = 'flex-end',
}
enum horisontalAlignmentEnum {
  left = 'flex-start',
  center = 'center',
  right = 'flex-end',
}
type horisontalAlignment = 'left' | 'center' | 'right';
type verticalAlignment = 'top' | 'center' | 'bottom';

@Component({
  selector: 'kirby-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss'],
})
export class ListCellComponent implements OnInit {
  @Input() horisontalAlignment: horisontalAlignment;
  @Input() verticalAlignment: verticalAlignment;
  @Input() width: number;

  private readonly defaultHorisontalAlignment: horisontalAlignment = 'left';
  private readonly defaultVerticalAlignment: verticalAlignment = 'center';
  private readonly defaultWidth = 1;

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

  getWidth(): string {
    if (this.width && this.width > 0) {
      return `${this.width * 100}%`;
    }
    return `${this.defaultWidth * 100}%`;
  }

  getAlignItems(): string {
    if (this.horisontalAlignment && horisontalAlignmentEnum[this.horisontalAlignment]) {
      return horisontalAlignmentEnum[this.horisontalAlignment];
    }
    return horisontalAlignmentEnum[this.defaultHorisontalAlignment];
  }

  getJustifyContent(): string {
    if (this.verticalAlignment && verticalAlignmentEnum[this.verticalAlignment]) {
      return verticalAlignmentEnum[this.verticalAlignment];
    }
    return verticalAlignmentEnum[this.defaultVerticalAlignment];
  }

  private setStyle() {
    this._flexBasisHost = this.getWidth();
    this._flexAlignHost = this.getAlignItems();
    this._flexJustifyHost = this.getJustifyContent();
  }
}
