import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { register } from 'swiper/element/bundle';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { CarouselSlideDirective } from './carousel-slide.directive';

register();

export type SelectedSlide = {
  slide: any;
  index: number;
};

export type CarouselConfig = SwiperOptions;
@Component({
  selector: 'kirby-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer;
  @ContentChild(CarouselSlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  @Input() config: CarouselConfig;
  @Input() noPadding: boolean;
  @Input() title: string;
  @Input() slides: any[];

  @Output() selectedSlide = new EventEmitter<SelectedSlide>();

  _paginationId = UniqueIdGenerator.scopedTo('pagination').next();
  _prevButtonId = UniqueIdGenerator.scopedTo('swiper-button-prev').next();
  _nextButtonId = UniqueIdGenerator.scopedTo('swiper-button-next').next();

  ngAfterViewInit() {
    const defaultConfig: SwiperOptions = {
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

    const config = Object.assign(defaultConfig, this.config);

    Object.assign(this.swiperContainer.nativeElement, config);

    this.swiperContainer.nativeElement.initialize();
  }

  public slideTo(index: number) {
    this.swiperContainer.nativeElement.swiper.slideTo(index);
  }
}
