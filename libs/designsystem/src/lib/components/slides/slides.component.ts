import { AfterViewInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef,
  Directive,
  ViewChild,
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
      <ion-slide *ngFor="let slide of slides">
        <ng-container
          *ngTemplateOutlet="slideTemplate; context: { $implicit: slide }"
        ></ng-container>
      </ion-slide>
    </ion-slides>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidesComponent implements AfterViewInit, OnChanges {
  @ViewChild('ionslides', { static: false }) ionSlides: IonSlides;
  @Input() slidesOptions: any;
  @Input() slides: any[];
  @Input() activeSlide: number = 0;
  @Output() selectedSlide = new EventEmitter<any>();

  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (this.ionSlides && changes.activeSlide) {
      this.ionSlides.slideTo(this.activeSlide);
    }
  }

  ngAfterViewInit() {
    this.ionSlides.slideTo(this.activeSlide);
  }

  onSlideChanged(e: any) {
    this.ionSlides.getActiveIndex().then((selectedIndex) => {
      this.selectedSlide.emit(this.slides[selectedIndex]);
    });
  }
}
