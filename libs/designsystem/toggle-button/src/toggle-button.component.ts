import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'kirby-toggle-button',
  templateUrl: './toggle-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  @Input() checked: boolean;
  @Output() checkChanged = new EventEmitter<boolean>();

  @ContentChildren(ButtonComponent, { read: ElementRef<HTMLButtonElement> }) buttons: QueryList<
    ElementRef<HTMLButtonElement>
  >;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: PointerEvent) {
    const targetElement = event.target as HTMLElement;
    const buttonEnabled: HTMLElement = targetElement.closest('button[kirby-button]:not(:disabled)');

    if (!buttonEnabled) return;

    this.checked = !this.checked;
    this.checkChanged.emit(this.checked);
    this.focusToggledButton();
  }

  focusToggledButton() {
    // force re-render to ensure that the new button is in the dom
    this.cdr.detectChanges();

    const buttonToFocus = this.elementRef.nativeElement.querySelector(
      'button[kirby-button]'
    ) as HTMLButtonElement;

    buttonToFocus.focus();
  }
}
