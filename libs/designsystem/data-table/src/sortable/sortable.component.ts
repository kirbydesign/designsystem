import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[sortable]',
  templateUrl: './sortable.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortableComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  @HostBinding('class.sortable')
  @Input()
  sortable = false;

  @Input() active = false;

  @Input() sortDirection: 'asc' | 'desc';
  @Input() iconAlignment: 'start' | 'end' = 'end';
  @Input() textAlignment: 'start' | 'center' | 'end' = 'start';

  @HostBinding('class.active')
  get isActive() {
    return this.active && this.sortable;
  }

  _getButtonClass() {
    return `align-${this.textAlignment}`;
  }

  @ViewChild('span') spanElement: ElementRef;

  ngAfterViewInit(): void {
    if (this.spanElement) {
      this.renderer.setAttribute(
        this.spanElement.nativeElement,
        'data-text',
        this.spanElement.nativeElement.textContent
      );
    }
  }
}
