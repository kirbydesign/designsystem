import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef,
  Directive,
  AfterViewInit,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Directive({
  selector: '[kirbySlide]',
})
export class SlideDirective {}

@Component({
  selector: 'kirby-slides',
  template: `
    <ion-slides [options]="slidesOptions" #ionslides>
      <ion-slide *ngFor="let slide of slides" [ngClass]="{ 'highlight-active': onlyOneSlideShown }">
        <ng-container
          *ngTemplateOutlet="slideTemplate; context: { $implicit: slide }"
        ></ng-container>
      </ion-slide>
    </ion-slides>
  `,
  styleUrls: ['./slides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidesComponent implements AfterViewInit {
  @ViewChild('ionslides', { static: false }) ionSlides: IonSlides;
  @Input() slidesOptions: any;
  @Input() slides: any[];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  onlyOneSlideShown: boolean;

  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  // instance of swiper only accessible AfterViewInit
  ngAfterViewInit() {
    this.countNoOfSlidesPerView();
  }

  countNoOfSlidesPerView() {
    this.ionSlides.getSwiper().then((swiper) => {
      swiper.on('breakpoint', () => {
        const _slidesPerView = swiper.params.slidesPerView;
        this.onlyOneSlideShown = _slidesPerView >= 1 && _slidesPerView < 2;
        this.changeDetectorRef.detectChanges();
      });

      const _slidesPerView = swiper.params.slidesPerView;
      this.onlyOneSlideShown = _slidesPerView >= 1 && _slidesPerView < 2;
      this.changeDetectorRef.markForCheck();
    });
  }
}
