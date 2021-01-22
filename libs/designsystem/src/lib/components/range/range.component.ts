import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  RendererStyleFlags2,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonRange } from '@ionic/angular';

export type RangeValue = number | { lower: number; upper: number };

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kirby-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  encapsulation: ViewEncapsulation.None, //   ShadowDom
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RangeComponent),
    },
  ],
})
export class RangeComponent implements OnInit, ControlValueAccessor {
  @ViewChild('ionRange', { static: false }) ionRange: IonRange;
  @ViewChild(IonRange, { read: ElementRef }) ionRangeElementRef: ElementRef;

  constructor(
    @Self() private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  private currentValue: RangeValue;
  @Input() color: string;
  @Input() debounce: number;
  @Input() disabled: boolean;

  @Input() max: number;
  @Input() min: number;
  @Input() mode: 'ios' | 'md';

  @Input() name: string;
  @Input() pin: boolean;
  @Input() snaps: boolean;
  @Input() step: number;
  @Input() ticks: number;

  @Output() valueChange: EventEmitter<RangeValue> = new EventEmitter<RangeValue>();

  @Input() startLabel: string;
  @Input() endLabel: string;

  public rangeValueChange($event: any): void {
    this.writeValue($event.detail.value);
  }

  public onTouched = () => {};
  public propagateChange = (_: any) => {};

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  public get value(): RangeValue {
    return this.currentValue;
  }

  public set value(value: RangeValue) {
    if (value !== this.currentValue) {
      this.currentValue = value;
      this.propagateChange(this.currentValue);
      this.valueChange.emit(this.currentValue);
    }
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  ngOnInit(): void {
    this.value = this.min;
  }

  public setLabel(color: string): void {
    const [property, pixelValue] = ['--label-color', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setLabelFontSize(size: string): void {
    const [property, pixelValue] = ['--label-font-size', size];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setLabelBackground(color: string): void {
    const [property, pixelValue] = ['--label-background', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setKnobBackground(color: string): void {
    const [property, pixelValue] = ['--knob-background', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setPin(color: string): void {
    const [property, pixelValue] = ['--pin-color', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setPinFontSize(size: string): void {
    const [property, pixelValue] = ['--pin-font-size', size];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setPinBackground(color: string): void {
    const [property, pixelValue] = ['--pin-background', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setTick(color: string): void {
    const [property, pixelValue] = ['--tick-color', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setActiveTick(color: string): void {
    const [property, pixelValue] = ['--tick-active-color', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setBar(color: string): void {
    const [property, pixelValue] = ['--bar-color', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setActiveBar(color: string): void {
    const [property, pixelValue] = ['--bar-active-color', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  public setBarBackground(color: string): void {
    const [property, pixelValue] = ['--bar-background', color];
    this.setCssVar(this.ionRangeElementRef.nativeElement, property, pixelValue);
  }

  private setCssVar(element: Element, property: string, value: string): void {
    this.zone.run(() =>
      this.renderer.setStyle(element, property, value, RendererStyleFlags2.DashCase)
    );
  }

  private toggleCssClass(element: Element, klass: string, condition: boolean): void {
    this.zone.run(() =>
      condition ? this.renderer.addClass(element, klass) : this.renderer.removeClass(element, klass)
    );
  }

  setStyle(prop: string, value: string): void {
    this.ionRangeElementRef.nativeElement.style.setProperty(prop, value);
  }
}
