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
  @Input() colortype?: 'primary';
  @Input() theme?: string; // TODO TRM - Skal vi have en theme model/interface, evt. global ting...
  @Input() routerLink: string;
  @Output() action = new EventEmitter();
  buttonCssClasses: {};

  constructor() { }

  ngOnInit() {
    const { expand, shape, theme, colortype } = this;
    this.buttonCssClasses = {
      'round': shape === 'round',
      'block': expand === 'block',
      'full': expand === 'full',
      ['button--' + colortype]: colortype,
      ['theme--' + theme] : theme
    };
  }

  handleClick() {
    this.action.emit();
  }
}
