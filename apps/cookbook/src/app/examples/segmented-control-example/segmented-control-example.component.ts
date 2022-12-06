import { Component } from '@angular/core';
import { SegmentItem } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent {
  defaultItems: SegmentItem[] = [
    {
      text: 'First item',
      id: 'first',
    },
    {
      text: 'Second item',
      id: 'second',
    },
  ];
}
