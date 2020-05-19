import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';

const RADIUS_MAP = {
  sm: 20,
  md: 28,
  lg: 48,
};

@Component({
  selector: 'kirby-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent implements AfterViewInit, OnDestroy {
  @Input() value: number = 0;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() themeColor: 'success' | 'warning' | 'danger';

  private hasElementBeenVisible = false;
  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.onElementVisible, {
      threshold: 0.5,
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.unobserve();
  }

  private onElementVisible = (entries: IntersectionObserverEntry[]) => {
    if (entries && entries.some((entry) => entry.isIntersecting)) {
      this.hasElementBeenVisible = true;
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
    return this.radius * 2;
  }

  get shownValue() {
    // This is needed to make an animation [0 -> value] when element is shown to the user
    return this.hasElementBeenVisible ? this.value : 0;
  }

  get radius() {
    return RADIUS_MAP[this.size];
  }
}
