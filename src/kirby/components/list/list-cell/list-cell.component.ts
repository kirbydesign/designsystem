import { Component, OnInit, Input, HostBinding } from '@angular/core';

const alignmentMap: Map<string, string> = new Map([
  ['top', 'flex-start'],
  ['left', 'flex-start'],
  ['bottom', 'flex-end'],
  ['right', 'flex-end'],
  ['center', 'center'],
  ['stretch', 'stretch'],
  ['baseline', 'baseline'],
  ['space-between', 'space-between'],
  ['space-around', 'space-around'],
]);

type horisontalAlignment = 'left' | 'center' | 'right' | 'space-between' | 'space-around';
type verticalAlignment = 'top' | 'center' | 'bottom' | 'stretch' | 'baseline';

const defaultHorisontalAlignment: horisontalAlignment = 'left';
const defaultVerticalAlignment: verticalAlignment = 'center';
const defaultWidth = 1;

@Component({
  selector: 'kirby-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss'],
})
export class ListCellComponent implements OnInit {
  @Input() horisontalAlignment: horisontalAlignment = defaultHorisontalAlignment;
  @Input() verticalAlignment: verticalAlignment = defaultVerticalAlignment;
  @Input() width: number = defaultWidth;

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
    console.warn(
      `Invalid value ${
        this.width
      } for width. Valid values numbers > 0. Defaulting to '${defaultWidth}'`
    );
    return `${defaultWidth * 100}%`;
  }

  getHorisontalAlignment(): string {
    if (this.horisontalAlignment && alignmentMap.get(this.horisontalAlignment)) {
      return alignmentMap.get(this.horisontalAlignment);
    }
    console.warn(
      `Invalid value ${
        this.horisontalAlignment
      } for horisontalAlignment. Valid values are 'left', 'center', 'right', 'space-between', 'space-around'. Defaulting to '${defaultHorisontalAlignment}'`
    );
    return alignmentMap.get(defaultHorisontalAlignment);
  }

  getVerticalAlignment(): string {
    if (this.verticalAlignment && alignmentMap.get(this.verticalAlignment)) {
      return alignmentMap.get(this.verticalAlignment);
    }
    console.warn(
      `Invalid value ${
        this.verticalAlignment
      } for verticalAlignment. Valid values are 'top', 'center', 'bottom', 'stretch', 'baseline'. Defaulting to '${defaultVerticalAlignment}'`
    );
    return alignmentMap.get(defaultVerticalAlignment);
  }

  private setStyle() {
    this._flexBasisHost = this.getWidth();
    this._flexAlignHost = this.getHorisontalAlignment();
    this._flexJustifyHost = this.getVerticalAlignment();
  }
}
