import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import SwiperCore, { A11y, Navigation, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

export interface KirbySlidesOptions extends SwiperOptions {}

export interface KirbySelectedSlide {
  slide: any;
  index: number;
}

SwiperCore.use([Pagination, Navigation, A11y]);

@Directive({
  selector: '[kirbySlide]',
})
export class SlideDirective {}

@Component({
  selector: 'kirby-slides',
  template: `
    <swiper [config]="slidesOptions" #swiperSlides (slideChange)="onSlideChanged($event)">
      <ng-container *ngFor="let slide of slides; let i = index">
        <ng-template swiperSlide>
          <ng-container
            *ngTemplateOutlet="slideTemplate; context: { $implicit: slide, index: i }"
          ></ng-container>
        </ng-template>
      </ng-container>
    </swiper>
  `,
  styleUrls: ['./slides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlidesComponent {
  private _slidesOptions: KirbySlidesOptions;

  @ViewChild('swiperSlides', { static: false }) swiper: SwiperComponent;

  @Input()
  set slidesOptions(val: KirbySlidesOptions) {
    this._slidesOptions = val;
  }

  @Input() slides: any[];
  @Output() selectedSlide = new EventEmitter<KirbySelectedSlide>();

  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  get slidesOptions(): KirbySlidesOptions {
    return this.mergeOptions();
  }

  private mergeOptions(): KirbySlidesOptions {
    return {
      slidesPerView: 1.15,
      centeredSlides: true,
      spaceBetween: 5,
      breakpoints: {
        721: {
          slidesPerView: 1.9,
        },
      },
      pagination: true,
      initialSlide: 0,
      ...this._slidesOptions,
    };
  }

  onSlideChanged(params: any) {
    const { activeIndex } = params[0];
    this.selectedSlide.emit({
      slide: this.slides[activeIndex],
      index: activeIndex,
    });
  }

  slideTo(index: number) {
    this.swiper.swiperRef.slideTo(index);
  }
}
