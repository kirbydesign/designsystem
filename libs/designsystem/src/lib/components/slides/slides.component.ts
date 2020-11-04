import { EventEmitter } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef,
  Directive,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  Output,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Directive({
  selector: '[kirbySlide]',
})
export class SlideDirective {}

@Component({
  selector: 'kirby-slides',
  template: `
    <ion-slides [options]="slidesOptions" #ionslides (ionSlideDidChange)="onSlideChanged($event)">
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

  @Output() selectedRecord = new EventEmitter<any>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  onlyOneSlideShown: boolean;

  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  // instance of swiper only accessible AfterViewInit
  ngAfterViewInit() {
    this.handleNoOfSlidesPerView();
  }

  onSlideChanged(e: any) {
    this.ionSlides.getActiveIndex().then((selectedIndex) => {
      this.selectedRecord.emit(this.slides[selectedIndex]);
    });
  }

  handleNoOfSlidesPerView() {
    this.ionSlides.getSwiper().then((swiper) => {
      swiper.on('breakpoint', () => {
        this.onlyOneSlideShown = this.isOnlyOneSlide(swiper);
        this.changeDetectorRef.detectChanges();
      });

      this.onlyOneSlideShown = this.isOnlyOneSlide(swiper);
      this.changeDetectorRef.markForCheck();
    });
  }

  private isOnlyOneSlide(swiper: any) {
    const _slidesPerView = swiper.params.slidesPerView;
    return _slidesPerView >= 1 && _slidesPerView < 2;
  }
}
