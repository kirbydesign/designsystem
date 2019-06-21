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
  nativeColor: string;

  private readonly SHAPE_INDEX = 0;
  private readonly COLOR_INDEX = 1;

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
  }

  ngOnInit() {}

  getThemeColor(name: string) {
    const globalValue = style.global['$kirby-colors'].value[name];
    const styleVar = globalValue.value.hex;
    return styleVar;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const shape: SimpleChange = changes.shape;
    const color: SimpleChange = changes.color;

    if (changes.shape) {
      this.classes[this.SHAPE_INDEX] = shape.currentValue;
    } else {
      this.classes[this.SHAPE_INDEX] = this.shape;
    }

    if (changes.color) {
      this.classes[this.COLOR_INDEX] = color.currentValue;
      this.nativeColor = this.getThemeColor(changes.color.currentValue);
    } else {
      this.classes[this.COLOR_INDEX] = this.color;
      this.nativeColor = this.getThemeColor('primary');
    }
  }
}
