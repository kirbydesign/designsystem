import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { ProgressCircleRingComponent } from './progress-circle-ring.component';

@Component({
  imports: [ProgressCircleRingComponent, CommonModule, ThemeColorDirective],
  selector: 'kirby-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent implements AfterViewInit, OnDestroy {
  readonly SIZE_CONFIG = {
    sm: { diameter: 40, strokeWidth: 3, upperBound: 95 },
    md: { diameter: 56, strokeWidth: 4, upperBound: 96 },
    lg: { diameter: 96, strokeWidth: 6, upperBound: 97 },
  };

  @HostBinding('attr.role') readonly role = 'progressbar';
  @HostBinding('attr.aria-valuenow')
  @Input()
  value: number = 0;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() themeColor: 'success' | 'warning' | 'danger' = 'success';

  @HostBinding('class')
  get _cssSize() {
    return this.size;
  }

  private hasElementBeenVisible?: boolean;
  private observer: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (!this.observer) {
      this.observer = new IntersectionObserver(this.onIntersectionChange, {
        threshold: 0.5,
      });
      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.unobserve();
  }

  private onIntersectionChange = (entries: IntersectionObserverEntry[]) => {
    this.hasElementBeenVisible = entries && entries.some((entry) => entry.isIntersecting);
    if (this.hasElementBeenVisible) {
      this.unobserve();
      this.changeDetectorRef.markForCheck();
    }
  };

  private unobserve() {
    if (this.observer) {
      this.observer.unobserve(this.elementRef.nativeElement);
      // Safari does not support "disconnect", see: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility
      if (typeof this.observer.disconnect === 'function') {
        this.observer.disconnect();
      }
    }
  }

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  get _diameter(): number {
    return this.SIZE_CONFIG[this.size].diameter;
  }

  get _shownValue() {
    // This is needed to make an animation [0 -> value] when element is shown to the user
    return this.hasElementBeenVisible ? this.value : 0;
  }

  get _radius() {
    return this._diameter / 2;
  }

  get _strokeWidth() {
    return this.SIZE_CONFIG[this.size].strokeWidth;
  }

  get _upperBound() {
    // This is needed to make sure that an input value close to 100 is not shown as 100
    return this.SIZE_CONFIG[this.size].upperBound;
  }
}
