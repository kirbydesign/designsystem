import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'textarea[kirby-textarea]',
  styleUrls: ['./textarea.component.scss'],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent {
  @Input() value: string;

  @HostBinding('class.state-success')
  private _isSuccess: boolean;

  @HostBinding('class.state-warning')
  private _isWarning: boolean;

  @HostBinding('class.state-danger')
  private _isDanger: boolean;

  @Input() set state(state: 'success' | 'warning' | 'danger') {
    this._isSuccess = state === 'success';
    this._isWarning = state === 'warning';
    this._isDanger = state === 'danger';
  }
}
