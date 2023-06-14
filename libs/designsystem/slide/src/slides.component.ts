import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Swiper, SwiperOptions } from 'swiper';
import { register } from 'swiper/element/bundle';
import {
  DesignTokenHelper,
  PlatformService,
  UniqueIdGenerator,
} from '@kirbydesign/designsystem/helpers';
import { SlideDirective } from './slide.directive';

// Swiper is not an Angular library,
// so we need to use their web components and register them manually.
// https://swiperjs.com/element
register();

export type SelectedSlide = {
  slide: any;
  index: number;
};

export type KirbySwiperOptions = SwiperOptions;
type SwiperContainer = HTMLElement & { initialize: () => void; swiper: Swiper };

@Component({
  selector: 'kirby-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidesComponent implements OnInit, AfterViewInit {
  constructor(private platform: PlatformService) {}

  @ViewChild('swiperContainer') swiperContainer: ElementRef<SwiperContainer>;
  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<SlideDirective>;

  @Input() slidesOptions?: KirbySwiperOptions;
  @Input() title: string;
  @Input() slides: unknown[];

  @Input() showNavigation?: boolean;

  /**
   * @deprecated Will be removed in next major version. Use `slideChange` instead.
   */
  @Output() selectedSlide = new EventEmitter<SelectedSlide>();
  @Output() slideChange = new EventEmitter<SelectedSlide>();

  _paginationId = UniqueIdGenerator.scopedTo('pagination').next();
  _prevButtonId = UniqueIdGenerator.scopedTo('swiper-button-prev').next();
  _nextButtonId = UniqueIdGenerator.scopedTo('swiper-button-next').next();
  _isTouch: boolean;

  ngOnInit() {
    this._isTouch = this.platform.isTouch();
    if (this.selectedSlide.observed) {
      console.warn(
        'Deprecation warning: `selectedSlide` will be removed in next major version. Use `slideChange` instead.'
      );
    }
    if (this.showNavigation === undefined) {
      console.warn(
        'Warning: kirby-slides.showNavigation will default to `true` in next major version and show navigation and pagination controls out of the box. Please set this property to `false` now if you want to opt-out of this future default.'
      );
    }
  }

  ngAfterViewInit() {
    const defaultConfig = this.showNavigation
      ? this.getDefaultConfig()
      : this.getNoControlsConfig();

    const config = { ...defaultConfig, ...this.slidesOptions };

    Object.assign(this.swiperContainer.nativeElement, config);

    this.swiperContainer.nativeElement.initialize();
  }

  public slideTo(index: number) {
    this.swiperContainer.nativeElement.swiper.slideTo(index);
  }

  private getDefaultConfig(): KirbySwiperOptions {
    const desktopBreakpoint = parseInt(DesignTokenHelper.breakpoints.medium); // TODO RK: Subtract 1 when breakpoint medium is fixed to 769px...
    const spaceBetween = parseInt(DesignTokenHelper.size('s'));
    const transitionDuration = parseInt(DesignTokenHelper.transitionDuration('long'));
    return {
      centeredSlides: true,
      centeredSlidesBounds: true,
      slidesPerView: 1.2,
      slidesPerGroup: 1,
      breakpoints: {
        [desktopBreakpoint]: {
          centeredSlides: false,
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
      spaceBetween: spaceBetween,
      speed: transitionDuration,
      pagination: {
        el: `.${this._paginationId}`,
        type: 'bullets',
      },
      navigation: {
        nextEl: `.${this._nextButtonId}`,
        prevEl: `.${this._prevButtonId}`,
      },
      on: {
        slideChange: (swiper) => {
          this.selectedSlide.emit({
            slide: this.slides[swiper.activeIndex],
            index: swiper.activeIndex,
          });
          this.slideChange.emit({
            slide: this.slides[swiper.activeIndex],
            index: swiper.activeIndex,
          });
        },
      },
    };
  }

  private getNoControlsConfig(): KirbySwiperOptions {
    return { ...this.getDefaultConfig(), pagination: false, navigation: false };
  }
}
