import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kirby-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() shape?: 'round';
  @Input() expand?: 'full' | 'block';
  @Input() theme?: string; // TODO TRM - Skal vi have en theme model/interface, evt. global ting...
  @Output() action = new EventEmitter<number>();
  buttonCssClasses: {};
  private clickCount = 0;

  constructor() { }

  ngOnInit() {
    const { expand, shape, theme } = this;
    this.buttonCssClasses = {
      'round': shape === 'round',
      'block': expand === 'block',
      'full': expand === 'full',
      ['theme--' + theme] : theme
    };
  }

  handleClick() {
    this.clickCount++;
    this.action.emit(this.clickCount);
  }
}
