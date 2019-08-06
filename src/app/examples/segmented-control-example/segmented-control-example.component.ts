import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

@Component({
  selector: 'kirby-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent implements OnInit, OnChanges {
  @Input() mode: 'default' | 'chip';
  activeSegment: SegmentItem;

  items: SegmentItem[] = this.getSegmentedItems();

  ngOnInit() {
    const checkedSegment = this.items.find((segment) => segment.checked === true);
    this.activeSegment = checkedSegment;
  }

  ngOnChanges(_: any): void {
    this.items = this.getSegmentedItems();
  }

  onSegmentClick(id) {
    this.activeSegment = id;
  }

  private getSegmentedItems(): SegmentItem[] {
    let segmentedItems = [];
    if (this.mode === 'chip') {
      segmentedItems.push({ text: 'Chip-1', checked: true, id: '1' });
      for (let i = 2; i < 7; ++i) {
        segmentedItems.push({ text: 'Chip-'.concat(i.toString()), id: i.toString() });
      }
    } else {
      segmentedItems.push({
        text: 'First item',
        checked: true,
        id: 'first',
        badge: {
          content: '4',
          themeColor: 'warning',
        },
      });
      segmentedItems.push({ text: 'Second item', id: 'second' });
    }
    return segmentedItems;
  }
}
