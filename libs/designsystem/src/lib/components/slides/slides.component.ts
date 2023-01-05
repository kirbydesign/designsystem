import { EventEmitter } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Directive({
  selector: '[kirbySlide]',
})
export class SlideDirective {}

@Component({
  selector: 'kirby-slides',
  template: `
    <ion-slides
      [options]="slidesOptions"
      #ionslides
      (ionSlideDidChange)="onSlideChanged()"
      (ionSlidesDidLoad)="slideTo(0)"
    >
      <ion-slide *ngFor="let slide of slides; let i = index">
        <ng-container
          *ngTemplateOutlet="slideTemplate; context: { $implicit: slide, index: i }"
        ></ng-container>
      </ion-slide>
    </ion-slides>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidesComponent {
  @ViewChild('ionslides', { static: false }) ionSlides: IonSlides;
  @Input() slidesOptions: any;
  @Input() slides: any[];
  @Output() selectedSlide = new EventEmitter<any>();

  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  onSlideChanged() {
    this.ionSlides.getActiveIndex().then((selectedIndex) => {
      this.selectedSlide.emit({
        slide: this.slides[selectedIndex],
        index: selectedIndex,
      });
    });
  }

  public slideTo(index: number) {
    this.ionSlides.slideTo(index);
  }
}
