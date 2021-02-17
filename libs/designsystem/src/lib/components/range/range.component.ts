import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  Renderer2,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { IonRange } from '@ionic/angular';

export type RangeValue = number | { lower: number; upper: number };

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kirby-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
})
export class RangeComponent implements AfterViewInit {
  @ContentChild(IonRange, { static: false }) ionRange: IonRange;

  @Input() minLabel: string;
  @Input() maxLabel: string;
  private element: HTMLElement;

  constructor(
    @Self() private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private zone: NgZone
  ) {
    this.element = elementRef.nativeElement;
  }

  @Input() get disabled(): boolean {
    if (this.ionRange.disabled === undefined) {
      return false;
    }
    return this.ionRange.disabled;
  }

  ngAfterViewInit(): void {}
}
