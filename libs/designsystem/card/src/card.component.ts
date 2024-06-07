import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';

type Variant = 'elevated' | 'flat' | 'outlined';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  _flat: boolean = false;
  _variant: Variant = 'elevated';

  @Input() title: string;
  @Input() subtitle: string;

  @HostBinding('style.--kirby-card-background-image')
  _backgroundImage: string;

  @Input()
  set backgroundImageUrl(value: string) {
    this._backgroundImage = `url('${value}')`;
  }

  @Input()
  hasPadding: boolean;

  private sizesSortedByBreakpoint = this.sortSizesByBreakpoint({
    small: 360,
    medium: 720,
    large: 1024,
  });

  @Input()
  set sizes(value: { [size: string]: number }) {
    if (typeof value === 'string') {
      console.error(
        'Sizes property cannot be a string. Please ensure the size property is bound as an expression:\n[sizes]="{...}"'
      );
    }
    this.sizesSortedByBreakpoint = this.sortSizesByBreakpoint(value);
  }

  @HostBinding('class.flat')
  @Input()
  set flat(value: boolean) {
    this._flat = value;
    console.warn('The flat attribute has been deprecated! use variant="flat" instead');
  }

  get flat(): boolean {
    return this._flat || this._variant === 'flat';
  }

  @Input()
  set variant(variant: Variant) {
    this._variant = variant;
  }

  @HostBinding('class.outlined')
  @Input()
  get outlined(): boolean {
    return !this._flat && this._variant === 'outlined';
  }

  constructor(
    private elementRef: ElementRef,
    private resizeObserverService: ResizeObserverService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.resizeObserverService.observe(this.elementRef, (entry) => this.handleResize(entry));
  }

  ngOnDestroy() {
    this.resizeObserverService.unobserve(this.elementRef);
  }

  private sortSizesByBreakpoint(sizes: { [size: string]: number }): [string, number][] {
    return Object.entries(sizes).sort(this.compareSizesByBreakpoint);
  }

  private compareSizesByBreakpoint(a: [string, number], b: [string, number]): number {
    return a[1] > b[1] ? 1 : b[1] > a[1] ? -1 : 0;
  }

  private handleResize(entry: ResizeObserverEntry) {
    const sizeAttributeName = 'size';
    const smallestBreakpointName = this.sizesSortedByBreakpoint[0][0];
    const smallestBreakpointWidth = this.sizesSortedByBreakpoint[0][1];
    if (entry.contentRect.width < smallestBreakpointWidth) {
      this.renderer.setAttribute(entry.target, sizeAttributeName, `<${smallestBreakpointName}`);
    } else {
      this.sizesSortedByBreakpoint.forEach(([size, width]) => {
        if (entry.contentRect.width >= width) {
          this.renderer.setAttribute(entry.target, sizeAttributeName, size);
        }
      });
    }
  }
}
