import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'kirby-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  @Input() disabled;
}
