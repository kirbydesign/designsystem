import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kirby-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-button',
  },
})
export class ButtonComponent {
  // Prevents event propagation in {N}
  @HostBinding('attr.isUserInteractionEnabled')
  isUserInteractionEnabled: boolean = true; // Default

  @HostBinding('attr.disabled')
  isDisabled: boolean = false; // Default

  @Input()
  set disabled(value: boolean) {
    // Using disabled without a value is still a valid way of disabling the button
    // e.g. <kirby-button disabled></kirby-button>
    // Hence value being undefined or empty string should be equivalent to true
    const isDisabled = value !== false;
    this.isDisabled = isDisabled;
    this.isUserInteractionEnabled = !isDisabled;
  }

  @Input() attentionLevel: '1' | '2' | '3' | '4' = '1';

  @Input() isDestructive: boolean = false;

  @Input() expand?: 'block';

  @Input() text?: string;

  @Input() isOutlinedOnFocus?: boolean = true;

  @Output() tap = new EventEmitter();

  isHighlighted: boolean = false;

  setHighlighted(value: boolean): void {
    this.isHighlighted = value;
  }

  // Web-only
  onMouseDown() {
    this.setHighlighted(true);
  }

  // Web-only
  onMouseUp() {
    this.setHighlighted(false);
  }

  // {N}-only
  onTap(args: any) {
    this.tap.emit(args);
  }
}
