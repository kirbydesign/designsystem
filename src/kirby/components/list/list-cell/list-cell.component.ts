import { Component, OnInit, Input, HostBinding } from '@angular/core';

type iconPosition = 'left' | 'right';

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
  @Input() horisontalAlignment: flexAlign = 'flex-start';
  @Input() verticalAlignment: flexAlign = 'center';
  @Input() iconUrl: string;
  @Input() iconPosition: iconPosition;
  @Input() flexGrow: string | number;

  @HostBinding('style.flex-grow') flexGrowHost: string;

  constructor() { }

  ngOnInit() {
    this.flexGrowHost = this.flexGrow + '';
  }

}
