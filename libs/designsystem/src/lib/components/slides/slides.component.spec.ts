import { Component, ViewChild } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { IonSlide, IonSlides } from '@ionic/angular';
import { byTestId, createHostFactory, HostComponent, SpectatorHost } from '@ngneat/spectator';

import { SlideDirective, SlidesComponent } from './slides.component';

class IonSlidesFake extends IonSlides {
  getSwiper = () =>
    Promise.resolve({
      on: () => {},
      params: {
        slidesPerView: 1,
      },
    });
  slideTo = (index: number, speed?: number, runCallbacks?: boolean) => Promise.resolve();
}

describe('SlidesComponent', () => {
  let spectator: SpectatorHost<SlidesComponent, HostComponent>;
  // let changeDetectorRef: ChangeDetectorRef;

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
    declarations: [IonSlidesFake, IonSlide, SlideDirective],
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

  it('should call slideTo with 4', () => {
    // Arrange
    spyOn(spectator.component.ionSlides, 'slideTo');

    // Act
    spectator.component.slideTo(2);

    // Assert
    expect(spectator.component.ionSlides.slideTo).toHaveBeenCalledWith(2);
  });
});
