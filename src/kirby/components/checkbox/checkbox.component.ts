import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  SimpleChange,
  ChangeDetectionStrategy,
} from '@angular/core';

declare var require: any;
const style: any = require('sass-extract-loader!./checkbox.component.scss');

@Component({
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() checked: boolean;
  @Input() color: string = 'primary';
  @Input() shape: string = 'square';
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

  ngOnInit() { }

  getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value.hex;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const shape: SimpleChange = changes.shape;
    const color: SimpleChange = changes.color;

    if (changes.shape) {
      this.classes.push(shape.currentValue);
    } else {
      this.classes.push(this.shape);
    }

    if (changes.color) {
      this.classes.push(color.currentValue);
    } else {
      this.classes.push(this.color);
    }
  }
}
