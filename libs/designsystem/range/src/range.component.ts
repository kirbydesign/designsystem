import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonRange } from '@ionic/angular/standalone';
import { forwardAttributes } from '@kirbydesign/designsystem/shared';

export type RangeValue = number | { lower: number; upper: number };

@Component({
  imports: [IonRange],
  selector: 'kirby-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RangeComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent implements OnChanges, OnInit, ControlValueAccessor, AfterViewInit {
  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() debounce: number;
  @Input() max: number;
  @Input() min: number;
  @Input() pin: boolean;
  @Input() step = 1;
  @Input() ticks: boolean;
  @Input() disabled = false;
  @Input() pinFormatter: (value: number) => string | number = this.defaultPinFormatter;
  @Input() dualKnobs = false;
  @Input()
  set value(value: RangeValue) {
    if (value !== this.currentValue) {
      this.currentValue = value;
      this.propagateChange(this.currentValue);
    }
  }

  get value(): RangeValue {
    return this.currentValue;
  }

  @Output() change: EventEmitter<RangeValue> = new EventEmitter<RangeValue>();
  @Output() move: EventEmitter<RangeValue> = new EventEmitter<RangeValue>();

  @ViewChild(IonRange, { static: true }) private ionRange: IonRange;

  private currentValue: RangeValue;
  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  constructor(
    private cdr: ChangeDetectorRef,
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initializeMoveEventEmitter();
  }

  ngOnChanges() {
    if (!this.ticks) return;

    /*
     * Max 10 ticks are allowed
     */
    const amountOfTicks = (this.max - this.min) / this.step;
    if (amountOfTicks > 9) {
      this.step = (this.max - this.min) / 9;
    }

    const ticks = this.getTicks();
    const snapToNearestTick = (val: number) =>
      ticks.reduce((a, b) => (Math.abs(b - val) < Math.abs(a - val) ? b : a));

    /*
     * Set value to the nearest tick (supports both single and dual knob modes)
     */
    if (this.dualKnobs) {
      const current = (this.currentValue as { lower: number; upper: number }) ?? {
        lower: this.min,
        upper: this.max,
      };
      this.value = {
        lower: snapToNearestTick(current.lower),
        upper: snapToNearestTick(current.upper),
      };
    } else {
      this.value = snapToNearestTick(this.currentValue as number);
    }
  }

  ngAfterViewInit(): void {
    forwardAttributes(
      this.element.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.element.nativeElement.querySelector('ion-range')
    );
  }

  private getTicks() {
    const ticks = [];
    for (let value = Number(this.min); value <= Number(this.max); value += Number(this.step)) {
      ticks.push(value);
    }
    return ticks;
  }

  private initializeMoveEventEmitter() {
    // We subscribe to ionRange's ionInput imperatively instead of in markup
    // to avoid doing work when no-one is listening to the move event.
    if (this.move.observed) {
      this.ionRange.ionInput.subscribe((rangeEvent) => {
        this._onRangeKnobMove(rangeEvent);
      });
    }
  }

  private defaultPinFormatter(value: number): number {
    return value;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  public _onRangeValueChange($event: any): void {
    this.writeValue($event.detail.value);
    this.change.emit(this.currentValue);
  }

  public _onRangeKnobMove($event: any): void {
    this.writeValue($event.detail.value);
    this.move.emit(this.currentValue);
  }

  public onTouched = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public propagateChange = (_: any) => {};

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
}
