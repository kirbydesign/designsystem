import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnChanges {
  @Input() checked: boolean;
  @Input() color: string = 'primary';
  @Input() shape: string = 'square';
  @Output() checkedChange = new EventEmitter<boolean>();

  classes: string[] = [];

  private readonly SHAPE_INDEX = 0;
  private readonly COLOR_INDEX = 1;

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(this.checked);
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
    } else {
      this.classes[this.COLOR_INDEX] = this.color;
    }
  }
}
