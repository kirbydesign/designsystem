import { Component, Input, HostBinding } from '@angular/core';

import { ButtonHelper } from './helpers/button.helper';

@Component({
  selector: 'kirby-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-button',
  },
  providers: [ButtonHelper],
})
export class ButtonComponent {
  @HostBinding('class.attention-level1')
  isAttentionLevel1: boolean = true; // Default

  @HostBinding('class.attention-level2')
  isAttentionLevel2: boolean;

  @HostBinding('class.attention-level3')
  isAttentionLevel3: boolean;

  @HostBinding('class.attention-level4')
  isAttentionLevel4: boolean;

  @HostBinding('class.destructive')
  destructive: boolean = false; // Default

  @HostBinding('class.disabled')
  isDisabled: boolean = false; // Default

  // Prevents event propagation in {N}
  @HostBinding('attr.isUserInteractionEnabled')
  isUserInteractionEnabled: boolean = true; // Default

  @Input()
  set disabled(value: boolean) {
    // Using disabled without a value is still a valid way of disabling the button
    // e.g. <kirby-button disabled></kirby-button>
    // Hence value being undefined or empty string should be equivalent to true
    const isDisabled = value !== false;
    this.isDisabled = isDisabled;
    this.isUserInteractionEnabled = !isDisabled;
  }

  @Input() set attentionLevel(level: '1' | '2' | '3' | '4') {
    this.isAttentionLevel1 = level === '1';
    this.isAttentionLevel2 = level === '2';
    this.isAttentionLevel3 = level === '3';
    this.isAttentionLevel4 = level === '4';
  }

  @Input() set isDestructive(state: boolean) {
    this.destructive = state;
  }
  @Input() expand?: 'block';

  @Input() text?: string;

  @Input() isOutlinedOnFocus?: boolean = true;

  isHighlighted: boolean = false;

  constructor(private buttonHelper: ButtonHelper) {}

  setHighlighted(value: boolean): void {
    this.isHighlighted = value;
  }

  // Web-only
  onMouseDown(args: any) {
    this.setHighlighted(true);
  }

  // Web-only
  onMouseUp(args: any) {
    this.setHighlighted(false);
  }

  // {N}-only
  onTouch(args: any) {
    this.buttonHelper.onPressAndHold(args, this.setHighlighted.bind(this));
  }
}
