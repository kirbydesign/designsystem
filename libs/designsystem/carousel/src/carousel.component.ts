import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { register } from 'swiper/element/bundle';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';

register();

export type CarouselConfig = SwiperOptions;
@Component({
  selector: 'kirby-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer;

  @Input() config: CarouselConfig;
  @Input() noPadding: boolean;
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
    };

    const config = Object.assign(defaultConfig, this.config);

    Object.assign(this.swiperContainer.nativeElement, config);

    this.swiperContainer.nativeElement.initialize();
  }
}
