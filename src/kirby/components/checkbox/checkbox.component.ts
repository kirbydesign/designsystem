import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  nativeColor(): string {
    return '';
  }

  onChecked(event) {
    this.checked = event.value;
    this.checkedChange.emit(this.checked);
  }

  constructor() { }

  ngOnInit() {
    this.classes.push('checkbox');
    this.classes.push(this.color || '');
    this.classes.push(this.shape || '');
  }
}
