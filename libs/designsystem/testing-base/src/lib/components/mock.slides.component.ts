import { Component, Directive, forwardRef, Input } from '@angular/core';
import { SlideDirective, SlidesComponent } from '@kirbydesign/designsystem/slide';

@Directive({
  selector: '[kirbySlide]',
  providers: [
    {
      provide: SlideDirective,
      useExisting: forwardRef(() => MockSlideDirective),
    },
  ],
})
export class MockSlideDirective {}

@Component({
  selector: 'kirby-slides',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: SlidesComponent,
      useExisting: forwardRef(() => MockSlidesComponent),
    },
  ],
})
export class MockSlidesComponent {
  @Input() slidesOptions: any;
  @Input() slides: any[];
}
