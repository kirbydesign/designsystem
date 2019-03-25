import {
  Component,
  Directive,
  Input,
  OnInit,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';

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
  @Input() items: any[];
  @Output() onChipSelect = new EventEmitter<any>();
  @ContentChild(SegmentedChipDirective, { read: TemplateRef }) segmentedChipTemplate;

  constructor() {}
  segmentedChipSelect(item: any): void {
    this.onChipSelect.emit(item);
  }
  /**
   * Lifecycle method:
   */
  ngOnInit(): void {}
}
export { SegmentedChipControlComponent, SegmentedChipDirective };
