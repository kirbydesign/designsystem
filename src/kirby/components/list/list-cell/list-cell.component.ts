import { Component, OnInit, Input, HostBinding } from '@angular/core';

type flexAlign = 'flex-start' | 'center' | 'flex-end';

@Component({
  selector: 'kirby-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss']
})
export class ListCellComponent implements OnInit {
  @Input() lineOne: string | number;
  @Input() lineTwo: string | number;
  @Input() lineThree: string | number;
  @Input() alignHorisontal: flexAlign = 'flex-start';
  @Input() alignVertical: flexAlign = 'flex-start';
  @Input() flexGrow: string | number;

  @HostBinding('style.flex-grow') flexGrowHost: string;

  constructor() { }

  ngOnInit() {
    this.flexGrowHost = this.flexGrow + '';
  }

}
