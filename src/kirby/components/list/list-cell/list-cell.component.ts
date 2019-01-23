import { Component, OnInit, Input } from '@angular/core';

export enum HorisontalAlignment {
  left,
  center,
  right
}

export enum VerticalAlignment {
  top,
  center,
  bottom
}

export enum IconPosition {
  left,
  right
}

@Component({
  selector: 'kirby-list-cell',
  templateUrl: './list-cell.component.html',
  styleUrls: ['./list-cell.component.scss']
})
export class ListCellComponent implements OnInit {
  @Input() lineOne: string | number;
  @Input() lineTwo: string | number;
  @Input() lineThree: string | number;
  @Input() horisontalAlignment: HorisontalAlignment = HorisontalAlignment.left;
  @Input() verticalAlignment: VerticalAlignment = VerticalAlignment.center;
  @Input() iconUrl: string;
  @Input() iconPosition: IconPosition;
  @Input() flexSize: number;


  constructor() { }

  ngOnInit() {  }

}
