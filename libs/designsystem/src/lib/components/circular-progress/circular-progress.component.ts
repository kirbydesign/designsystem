import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import { ThemeColor } from './../../helpers/theme-color.type';

const RADIUS_MAP = {
  sm: 20,
  md: 28,
  lg: 48,
};

const STROKE_WIDTH = 4;

@Component({
  selector: 'kirby-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressComponent implements AfterViewInit {
  @Input() value: number = 0;

  @Input() size: 'sm' | 'md' | 'lg';

  @Input() themeColor: ThemeColor;

  private hasElementBeenVisible = false;

  observer: IntersectionObserver;

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.onElementVisible);
    this.observer.observe(this.elementRef.nativeElement);
  }

  onElementVisible = (entries: IntersectionObserverEntry[]) => {
    if (entries && entries.length === 1 && entries[0].isIntersecting) {
      this.observer.unobserve(this.elementRef.nativeElement);
      this.hasElementBeenVisible = true;
      this.changeDetectorRef.markForCheck();
    }
  };

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
    if (this.size) {
      return RADIUS_MAP[this.size];
    } else {
      return RADIUS_MAP.md;
    }
  }

  get strokeWidth() {
    return STROKE_WIDTH;
  }
}
