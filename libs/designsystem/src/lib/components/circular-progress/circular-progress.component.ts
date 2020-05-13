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

@Component({
  selector: 'kirby-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularProgressComponent implements AfterViewInit {
  @Input() radius: number = 40; // TODO: Clarify: Should size be picked from a set of predefined Kirby sizes instead? I.e. sm, md, lg
  @Input() value: number = 0;

  @Input() themeColor: ThemeColor;

  private hasElementBeenVisible = false;

  observer: IntersectionObserver;

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(this.onElementVisible);
    // TODO: Only trigger this when user actually sees it in view (If possible and needed?)
    this.observer.observe(this.elementRef.nativeElement);
  }

  onElementVisible = () => {
    this.observer.unobserve(this.elementRef.nativeElement);
    this.hasElementBeenVisible = true;
    this.changeDetectorRef.markForCheck();
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
}
