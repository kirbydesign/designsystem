import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { SegmentItem } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-segmented-control-example',
  templateUrl: './segmented-control-example.component.html',
  styleUrls: ['./segmented-control-example.component.scss'],
})
export class SegmentedControlExampleComponent implements OnInit, OnChanges {
  @Input() mode: 'default' | 'chip';
  activeSegment: SegmentItem;

  items: SegmentItem[] = this.getSegmentedItems();

  ngOnInit() {
    this.mode = 'default';
    const checkedSegment = this.items.find((segment) => segment.checked === true);
    this.activeSegment = checkedSegment;
  }

  ngOnChanges(_: any): void {
    this.items = this.getSegmentedItems();
    this.activeSegment = this.items[0];
  }

  onSegmentSelect(selectedSegment: SegmentItem) {
    this.activeSegment = selectedSegment;
  }

  onCheckedChange(newState: boolean): void {
    this.mode = newState ? 'chip' : 'default';
    this.ngOnChanges(null);
  }

  private getSegmentedItems(): SegmentItem[] {
    let segmentedItems = [];
    if (this.mode === 'chip') {
      segmentedItems.push({ text: 'Chip-1', checked: true, id: '1' });
      // Add additional chips for testing
      Array.from('23456'.split('')).forEach((i: string) => {
        segmentedItems.push({ text: 'Chip-'.concat(i), id: i });
      });
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
