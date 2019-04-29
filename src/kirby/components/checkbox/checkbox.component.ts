import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var require: any;
const style: any = require('sass-extract-loader!./checkbox.component.scss');

@Component({
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() checked: boolean;
  @Input() color: string;
  @Input() shape: string;
  @Output() checkedChange = new EventEmitter<boolean>();

  classes: string[] = [];

  get nativeColor(): string {
    if (this.color) {
      return this.getThemeColor('kirby-' + this.color);
    } else {
      return this.getThemeColor('kirby-primary');
    }
  }

  onChecked(event): void {
    this.checked = event.value;
    this.checkedChange.emit(this.checked);
  }

  constructor() {}

  ngOnInit() {
    this.classes.push('checkbox');
    this.classes.push(this.color || '');
    this.classes.push(this.shape || '');
  }

  getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value.hex;
  }
}
