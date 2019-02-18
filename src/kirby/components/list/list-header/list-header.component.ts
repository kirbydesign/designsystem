import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  @Input() horisontalAlignment: string;
  @Input() verticalAlignment: string;
  @Input() width: string;
  @Input() text: string;

  @HostBinding('style.flex-basis')
  private _flexBasisHost: string;
  @HostBinding('style.align-items')
  private _flexAlignHost: string;
  @HostBinding('style.justify-content')
  private _flexJustifyHost: string;

  constructor() { }

  ngOnInit() {
    this._flexBasisHost = this.width;
  }

}
