import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'cookbook-reactive-form-state',
  templateUrl: './reactive-form-state.component.html',
  styleUrls: ['./reactive-form-state.component.scss'],
  imports: [JsonPipe, KeyValuePipe],
})
export class ReactiveFormStateComponent {
  @Input() form: FormGroup;
}
