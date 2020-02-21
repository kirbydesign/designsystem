import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  EventEmitter,
  HostListener,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'textarea[kirby-textarea]',
  styleUrls: ['./textarea.component.scss'],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent implements OnChanges {
  kirbyChange = new EventEmitter<string>();

  @Input() value: string;

  @HostBinding('class.error')
  @Input()
  hasError: boolean;

  @HostBinding('attr.autocomplete')
  @Input()
  autocomplete: 'on' | 'off' = 'off';

  @HostBinding('attr.autocorrect')
  @Input()
  autocorrect: 'on' | 'off' = 'off';

  @HostBinding('attr.maxlength')
  @Input()
  maxlength: number;

  @HostListener('keyup', ['$event.target.value'])
  _onKeyUp(value: string) {
    this.kirbyChange.emit(value);
  }

  @HostListener('paste', ['$event.target'])
  @HostListener('cut', ['$event.target'])
  _onCutPaste(target: HTMLInputElement) {
    //Value of textarea element is updated after cut/paste:
    setTimeout(() => this.kirbyChange.emit(target.value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.kirbyChange.emit(changes.value.currentValue);
    }
  }
}
