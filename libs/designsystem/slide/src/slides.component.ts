import {
  AfterViewInit,
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
import { PlatformService, UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { SlideDirective } from './slide.directive';

// Swiper is not an Angular library,
// so we need to use their web components and register them manually.
// https://swiperjs.com/element
register();

export type SelectedSlide = {
  slide: unknown;
  index: number;
};

export type KirbySwiperOptions = SwiperOptions;
type SwiperContainer = HTMLElement & { initialize: () => void; swiper: Swiper };

@Component({
  selector: 'kirby-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit, AfterViewInit {
  constructor(private platform: PlatformService) {}

  @ViewChild('swiperContainer') swiperContainer: ElementRef<SwiperContainer>;
  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<SlideDirective>;

  @Input() slidesOptions: KirbySwiperOptions;
  @Input() ignorePagePadding: boolean;
  @Input() title: string;
  @Input() slides: unknown[];

  // simpleSlider is a temporary solution to make the slides component backwards compatible with the old design.
  @Input() simpleSlider = false;

  @Output() selectedSlide = new EventEmitter<SelectedSlide>();

  _paginationId = UniqueIdGenerator.scopedTo('pagination').next();
  _prevButtonId = UniqueIdGenerator.scopedTo('swiper-button-prev').next();
  _nextButtonId = UniqueIdGenerator.scopedTo('swiper-button-next').next();
  _isTouch: boolean;

  ngOnInit() {
    this._isTouch = this.platform.isTouch();
  }

  ngAfterViewInit() {
    const defaultConfig = this.simpleSlider ? this.getSimpleConfig() : this.getDefaultConfig();

    const config = Object.assign(this.slidesOptions, defaultConfig);

    Object.assign(this.swiperContainer.nativeElement, config);

    this.swiperContainer.nativeElement.initialize();
  }

  public slideTo(index: number) {
    this.swiperContainer.nativeElement.swiper.slideTo(index);
  }

  private getDefaultConfig(): KirbySwiperOptions {
    return {
      spaceBetween: 16,
      centeredSlidesBounds: true,
      speed: 600,
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
        },
      },
    };
  }

  private getSimpleConfig(): KirbySwiperOptions {
    return {
      pagination: false,
      navigation: false,
      on: {
        slideChange: (swiper) => {
          this.selectedSlide.emit({
            slide: this.slides[swiper.activeIndex],
            index: swiper.activeIndex,
          });
        },
      },
    };
  }
}
