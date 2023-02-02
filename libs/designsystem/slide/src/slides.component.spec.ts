import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { IonSlide } from '@ionic/angular';
import { byTestId, createHostFactory, HostComponent, SpectatorHost } from '@ngneat/spectator';
import { SlideDirective } from './slide.directive';
import { SlidesComponent } from './slides.component';

describe('SlidesComponent', () => {
  let spectator: SpectatorHost<SlidesComponent, HostComponent>;

  @Component({ selector: 'kirby-slides-host-component', template: '' })
  class KirbySlidesHostComponent {
    slides = [0, 1, 2, 3, 4];
    slidesOptions = {
      spaceBetween: 5,
      centeredSlides: true,
      slidesPerView: 1.15,
      breakpoints: {
        721: {
          slidesPerView: 2.15,
          centeredSlides: false,
        },
      },
    };
  }

  const createHost = createHostFactory({
    component: SlidesComponent,
    host: KirbySlidesHostComponent,
    declarations: [IonSlide, SlideDirective],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-slides [slidesOptions]="slidesOptions" [slides]="slides">
      <span data-testid="slideContent" *kirbySlide>MockContent</span>
      </kirby-slides>`
    );

    spectator.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(spectator.component).toBeTruthy();
  }));

  it('should contain 5 slides', () => {
    expect(spectator.queryAll(byTestId('slideContent')).length).toBe(5);
  });

  it('should pass options-object to ion-slides', () => {
    expect(spectator.component.slidesOptions).toEqual(new KirbySlidesHostComponent().slidesOptions);
  });

  it('should call slideTo with 2', () => {
    const slideToSpy = spyOn(spectator.component, 'slideTo');

    spectator.component.slideTo(2);

    expect(slideToSpy).toHaveBeenCalledWith(2);
  });
});
