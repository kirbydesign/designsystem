import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kirby-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  private checkedSubject = new BehaviorSubject(false);
  checked$ = this.checkedSubject.asObservable();
  public get checked(): boolean {
    return this.checkedSubject.getValue();
  }
  @Input()
  public set checked(checked: boolean) {
    this.checkedSubject.next(checked);
  }
  @Output() checkChanged = new EventEmitter<boolean>();
  @HostListener('click')
  onClick() {
    this.checkedSubject.next(!this.checked);
    this.checkChanged.emit(this.checked);
  }
}
