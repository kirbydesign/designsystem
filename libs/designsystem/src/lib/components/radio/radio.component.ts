import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input()
  value: any;

  @Input()
  disabled: any;
}
