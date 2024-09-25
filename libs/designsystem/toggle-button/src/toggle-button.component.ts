import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'kirby-toggle-button',
  templateUrl: './toggle-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  @Input() checked: boolean;
  @Output() checkChanged = new EventEmitter<boolean>();

  @HostListener('click', ['$event'])
  onClick(event: PointerEvent) {
    const targetElement = event.target as HTMLElement;
    const buttonDisabled = targetElement.closest('button[kirby-button]:not(:disabled)');

    if (!buttonDisabled) return;

    this.checked = !this.checked;
    this.checkChanged.emit(this.checked);
  }
}
