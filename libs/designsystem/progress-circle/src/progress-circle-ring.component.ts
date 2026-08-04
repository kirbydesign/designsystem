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
  @Input() upperBound: number;

  @HostBinding('class.view-initialized')
  viewInitialized;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  get _progress(): number {
    if (this.value === 0) return 0;
    const valueWithinBounds = this.value < this.upperBound || this.value > 99;
    return valueWithinBounds ? this.value : this.upperBound;
  }

  get _remainder(): number {
    return 100 - this._progress;
  }
}
