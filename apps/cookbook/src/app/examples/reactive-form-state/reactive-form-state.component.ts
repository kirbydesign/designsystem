import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cookbook-reactive-form-state',
  templateUrl: './reactive-form-state.component.html',
  styleUrls: ['./reactive-form-state.component.scss'],
})
export class ReactiveFormStateComponent {
  @Input() form: FormGroup;
}
