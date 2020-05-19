import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ContentChild,
  AfterContentChecked,
  OnDestroy,
  ElementRef,
} from '@angular/core';

import { InputCounterComponent } from './input-counter/input-counter.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent implements AfterContentChecked, OnDestroy {
  private isRegistered = false;

  @Input() label: string;
  @Input() message: string;

  @ContentChild(InputCounterComponent, { static: false }) counter: InputCounterComponent;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentChecked(): void {
    const element = this.elementRef.nativeElement;
    if (!this.isRegistered && element.isConnected && element.querySelectorAll('input, textarea')) {
      // Host is connected to dom and slotted input/textarea is present:
      this.isRegistered = true;
      document.dispatchEvent(
        new CustomEvent('ionInputDidLoad', {
          detail: element,
        })
      );
    }
  }

  ngOnDestroy(): void {
    document.dispatchEvent(
      new CustomEvent('ionInputDidUnload', {
        detail: this.elementRef.nativeElement,
      })
    );
  }
}
