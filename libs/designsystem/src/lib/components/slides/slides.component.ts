import { EventEmitter } from '@angular/core';
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
export class SlidesComponent {
  @ViewChild('ionslides', { static: false }) ionSlides: IonSlides;
  @Input() slidesOptions: any;
  @Input() slides: any[];
  @Output() selectedSlide = new EventEmitter<any>();

  @ContentChild(SlideDirective, { static: true, read: TemplateRef })
  public slideTemplate: TemplateRef<any>;

  onSlideChanged(e: any) {
    this.ionSlides.getActiveIndex().then((selectedIndex) => {
      this.selectedSlide.emit(this.slides[selectedIndex]);
    });
  }
}
