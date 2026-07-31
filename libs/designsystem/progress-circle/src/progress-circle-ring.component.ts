import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'kirby-progress-circle-ring',
  templateUrl: './progress-circle-ring.component.html',
  styleUrls: ['./progress-circle-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleRingComponent implements AfterViewInit {
  @Input() value: number = 0;
  @Input() themeColor: 'success' | 'warning' | 'danger' = 'success';
  @Input() strokeWidth: number;
  @Input() upperBound: number;

  @HostBinding('class.view-initialized')
  viewInitialized;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  /**
   * Outer radius as a CSS length. The SVG fills the host, so the circle is sized relative to it
   * (50% of the host), inset by half the stroke width so the stroke's outer edge aligns with the
   * host edge. Because the radius is relative but the stroke width is absolute, the ring scales
   * with the host while the stroke keeps a constant pixel width.
   */
  get _radius(): string {
    return `calc(50% - ${this.strokeWidth / 2}px)`;
  }

  /**
   * Progress as a percentage (0-100). The progress circle declares `pathLength="100"`, so the
   * stroke-dasharray is expressed directly in percent and stays correct regardless of the rendered
   * size.
   */
  get _progress(): number {
    const valueWithinBounds = this.value < this.upperBound || this.value > 99;
    return valueWithinBounds ? this.value : this.upperBound;
  }

  get _remainder(): number {
    return 100 - this._progress;
  }

  get _progressStrokeWidth(): number {
    // Do not render stroke if progress is 0, otherwise it will show as a dot
    if (this._progress === 0) return 0;

    return this.strokeWidth;
  }
}
