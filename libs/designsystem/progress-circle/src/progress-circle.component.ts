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
  imports: [ProgressCircleRingComponent, ThemeColorDirective],
  selector: 'kirby-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleComponent implements AfterViewInit, OnDestroy {
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

  get _shownValue() {
    // This is needed to make an animation [0 -> value] when element is shown to the user
    return this.hasElementBeenVisible ? this.value : 0;
  }
}
