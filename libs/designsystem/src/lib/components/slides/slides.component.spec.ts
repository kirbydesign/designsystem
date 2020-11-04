import { ChangeDetectorRef } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { IonSlide, IonSlides } from '@ionic/angular';
import { byTestId, createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SlideDirective, SlidesComponent } from './slides.component';

class IonSlidesFake extends IonSlides {
  getSwiper = () =>
    Promise.resolve({
      on: () => {},
      params: {
        slidesPerView: 1,
      },
    });
}

describe('SlidesComponent', () => {
  let spectator: SpectatorHost<SlidesComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  const createHost = createHostFactory({
    component: SlidesComponent,
    declarations: [IonSlidesFake, IonSlide, SlideDirective],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-slides [slidesOptions]="mockSlideOptions" [slides]="slides">
      <span data-testid="slideContent" *kirbySlide>MockContent</span>
      </kirby-slides>`,
      {
        hostProps: {
          slides: [0, 1, 2, 3, 4],
          slideOptions: {
            spaceBetween: 5,
            centeredSlides: true,
            slidesPerView: 1.15,
            breakpoints: {
              721: {
                slidesPerView: 2.15,
                centeredSlides: false,
              },
            },
          },
        },
      }
    );

    changeDetectorRef = (spectator as any).instance.changeDetectorRef;

    spectator.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(spectator.component).toBeTruthy();
  }));

  it('should contain 5 slides', () => {
    expect(spectator.queryAll(byTestId('slideContent')).length).toBe(5);
  });
});
