import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EventData } from 'tns-core-modules/ui/page/page';
import { Switch } from 'tns-core-modules/ui/switch/switch';

import { ThemeColor } from './../../helpers/theme-color.type';

@Component({
  selector: 'kirby-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() themeColor?: ThemeColor;
  @Output() change = new EventEmitter<boolean>();
  checkedChange(args: EventData): void {
    const toggle = args.object as Switch;
    this.change.emit(toggle.checked);
  }
  ionChange(event): void {
    const toggle = event.detail;
    this.change.emit(toggle.checked);
  }
}
