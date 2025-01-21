import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'cookbook-reactive-form-state',
  templateUrl: './reactive-form-state.component.html',
  styleUrls: ['./reactive-form-state.component.scss'],
  imports: [NgFor, NgIf, JsonPipe, KeyValuePipe],
})
export class ReactiveFormStateComponent {
  @Input() form: FormGroup;
}
