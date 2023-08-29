import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import {
  KirbySwiperOptions,
  SelectedSlide,
  SlidesComponent,
} from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-simple-example.component.html',
})
export class SlidesSimpleExampleComponent {
  constructor(
    private toastController: ToastController,
    private renderer: Renderer2,
    private hostElement: ElementRef
  ) {}

  currentSlideIndex = 0;

  setCurrentIndex(event) {
    this.currentSlideIndex = event.index;
  }

  @ViewChild(SlidesComponent, { read: ElementRef }) slidesElement: ElementRef<SlidesComponent>;
  @ViewChild(SlidesComponent) slidesComp: SlidesComponent;

  @HostListener('sl-change')
  onRatingChange() {
    this.slidesComp.slideTo(this.currentSlideIndex + 1);
  }

  options: KirbySwiperOptions = {
    allowTouchMove: false,
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
    },
  };

  slides = [...Array(4).keys()].map((number) => ({
    title: `Spørgsmål ${number + 1}`,
    cardContent: `Hvor nemt var det at finde det, du skulle bruge i netbanken?`,
  }));

  getDataFromActiveSlide(selectedSlide: SelectedSlide) {
    const config: ToastConfig = {
      message: `Changed to ${selectedSlide.slide.title}`,
      messageType: 'success',
      durationInMs: 1000,
    };
    this.toastController.showToast(config);
  }

  remove() {
    this.renderer.removeChild(this.hostElement, this.slidesElement.nativeElement);
  }
}
