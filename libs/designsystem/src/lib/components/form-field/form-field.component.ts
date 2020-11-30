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
  private element: HTMLElement;
  private focusElement: HTMLElement;

  @Input() label: string;
  @Input() message: string;

  @ContentChild(InputCounterComponent, { static: false }) counter: InputCounterComponent;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.element = elementRef.nativeElement;
    this.focusElement = this.element.closest('[scroll-into-view]') || this.element;
  }

  ngAfterContentChecked(): void {
    if (
      !this.isRegistered &&
      this.element.isConnected &&
      this.element.querySelectorAll('input, textarea').length > 0
    ) {
      // Host is connected to dom and slotted input/textarea is present:
      this.isRegistered = true;
      document.dispatchEvent(
        new CustomEvent('ionInputDidLoad', {
          detail: this.focusElement,
        })
      );
    }
  }

  ngOnDestroy(): void {
    document.dispatchEvent(
      new CustomEvent('ionInputDidUnload', {
        detail: this.focusElement,
      })
    );
  }
}
