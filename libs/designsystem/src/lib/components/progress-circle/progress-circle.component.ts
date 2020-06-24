import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'kirby-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent implements AfterViewChecked, OnDestroy {
  static readonly DIAMETER_MAP = {
    sm: 40,
    md: 56,
    lg: 96,
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
  private attachObserverTimeoutId;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.attachObserver();
  }

  ngOnDestroy(): void {
    this.unobserve();
  }

  private attachObserver() {
    if (!this.observer) {
      // Ensure element is connected before observing:
      if (this.elementRef.nativeElement.isConnected) {
        this.observer = new IntersectionObserver(this.onIntersectionChange, {
          threshold: 0.5,
        });
        this.observer.observe(this.elementRef.nativeElement);
      } else if (!this.attachObserverTimeoutId) {
        // Try again in a tick when the element is connected to the DOM:
        this.attachObserverTimeoutId = setTimeout(() => this.attachObserver());
      }
    }
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
    return ProgressCircleComponent.DIAMETER_MAP[this.size];
  }

  get shownValue() {
    // This is needed to make an animation [0 -> value] when element is shown to the user
    return this.hasElementBeenVisible ? this.value : 0;
  }

  get radius() {
    return this.diameter / 2;
  }
}
