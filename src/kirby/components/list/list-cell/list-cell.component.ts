import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

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
  @Input() horisontalAlignment: horisontalAlignment = 'left';
  @Input() verticalAlignment: verticalAlignment = 'center';
  @Input() width = 1;

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
    return this.width ? `${this.width * 100}%` : '100%';
  }

  getAlignItems(): string {
    return this.horisontalAlignment &&
      horisontalAlignmentEnum[this.horisontalAlignment]
      ? horisontalAlignmentEnum[this.horisontalAlignment]
      : horisontalAlignmentEnum.left;
  }

  getJustifyContent(): string {
    return this.verticalAlignment &&
      verticalAlignmentEnum[this.verticalAlignment]
      ? verticalAlignmentEnum[this.verticalAlignment]
      : verticalAlignmentEnum.center;
  }
}
