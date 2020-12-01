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
    // Allow optional wrapper to scroll into view:
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
      // Dispatch an `ionInputDidLoad` event to register
      // form field + input/textarea with Ionic input shims
      // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/input-shims.ts
      document.dispatchEvent(
        new CustomEvent('ionInputDidLoad', {
          detail: this.focusElement,
        })
      );
    }
  }

  ngOnDestroy(): void {
    // Dispatch an `ionInputDidUnload` event to unregister
    // form field + input/textarea from Ionic input shims
    // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/input-shims.ts
    document.dispatchEvent(
      new CustomEvent('ionInputDidUnload', {
        detail: this.focusElement,
      })
    );
  }
}
