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

@Component({
  selector: 'kirby-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent implements AfterViewInit, OnDestroy {
  private SIZE_CONFIG = {
    sm: { diameter: 40, strokeWidth: 3 },
    md: { diameter: 56, strokeWidth: 4 },
    lg: { diameter: 96, strokeWidth: 6 },
  };

  @Input() value: number = 0;
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
  get diameter(): number {
    return this.SIZE_CONFIG[this.size].diameter;
  }

  get shownValue() {
    // This is needed to make an animation [0 -> value] when element is shown to the user
    return this.hasElementBeenVisible ? this.value : 0;
  }

  get radius() {
    return this.diameter / 2;
  }

  get strokeWidth() {
    return this.SIZE_CONFIG[this.size].strokeWidth;
  }
}
