import {
  Component,
  Directive,
  Input,
  OnInit,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';

interface SegmentChip {
  index: number;
  title: string;
}

@Directive({
  selector: '[kirbySegmentedChip]',
})
class SegmentedChipDirective {}

@Component({
  selector: 'kirby-segmented-chip-control',
  templateUrl: './segmentes-chip-control.component.html',
  styleUrls: ['./segmentes-chip-control.component.scss'],
})
class SegmentedChipControlComponent implements OnInit {
  @Input() items: SegmentChip[];
  @Output() onChipSelect = new EventEmitter<SegmentChip>();
  @ContentChild(SegmentedChipDirective, { read: TemplateRef }) segmentedChipTemplate;

  constructor() {}
  segmentedChipSelect(item: SegmentChip): void {
    this.onChipSelect.emit(item);
  }
  /**
   * Lifecycle method:
   */
  ngOnInit(): void {}
}
export { SegmentedChipControlComponent, SegmentedChipDirective };
