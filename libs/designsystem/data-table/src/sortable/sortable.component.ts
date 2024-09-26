import { CommonModule } from '@angular/common';
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
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'th[sortable]',
  templateUrl: './sortable.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconModule],
  standalone: true,
})
export class TableSortableComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  @HostBinding('class.sortable')
  @Input()
  sortable = false;

  @Input() active = false;

  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() iconAlignment: 'start' | 'end' = 'end';
  @Input() alignment: 'start' | 'center' | 'end' = 'start';

  @HostBinding('class.active')
  get isActive() {
    return this.sortable && this.active;
  }

  _getAlignmentClasses() {
    const alignmentClasses: string[] = [];

    if (this.iconAlignment === 'start') {
      alignmentClasses.push('row-reverse');
    }

    alignmentClasses.push(`align-${this.alignment}`);

    return alignmentClasses;
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
