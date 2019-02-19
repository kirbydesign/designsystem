import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { ListFormatService, horisontalAlignment } from '../service/list-format.service';

@Component({
  selector: 'kirby-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
})
export class ListHeaderComponent implements OnInit {

  @Input() horisontalAlignment: horisontalAlignment;
  @Input() width;
  @Input() text: string;
  @Input() size = 3;

  @HostBinding('style.flex-basis')
  private _flexBasisHost: string;
  @HostBinding('style.justify-content')
  private _flexAlignHost: string;

  constructor(public listFormatService: ListFormatService) {}

  ngOnInit() {
    this.setStyle();
  }

  private setStyle() {
    this._flexBasisHost = this.listFormatService.getWidth(this.width)  ;
    this._flexAlignHost = this.listFormatService.getHorisontalAlignment(this.horisontalAlignment);
  }

  get headerTag() {
    return `h${this.size}`;
  }

  get header() {
    return `<h${this.size}>${this.text}</h${this.size}>`;
  }

}
