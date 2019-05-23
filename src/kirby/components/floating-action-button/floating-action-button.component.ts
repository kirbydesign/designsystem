import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-floating-action-button',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})
export class FloatingActionButtonComponent {
  // TODO: showShadow should become an "elevation" enum in the future;
  @Input() showShadow?: boolean = true;
  @Input() disabled?: boolean = false;
  @Input() isFloating?: boolean = true;
}
