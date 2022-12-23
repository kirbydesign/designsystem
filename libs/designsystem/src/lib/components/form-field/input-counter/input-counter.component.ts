import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormFieldModule } from '../form-field.module';

import { InputComponent } from '../input/input.component';

import { TextareaComponent } from './../textarea/textarea.component';

@Component({
  standalone: true,
  imports: [FormFieldModule],
  selector: 'kirby-input-counter',
  templateUrl: './input-counter.component.html',
})
export class InputCounterComponent implements OnInit, OnDestroy {
  @Input() listenTo: InputComponent | TextareaComponent;
  length: number;
  maxlength: number;
  private _inputChangeSubscription: Subscription;

  get text(): string {
    if (this.length === undefined) {
      return undefined;
    }
    const ofMaxlength = this.maxlength ? `/${this.maxlength}` : '';
    return `${this.length}${ofMaxlength}`;
  }

  ngOnInit(): void {
    if (this.listenTo) {
      this.length = this.listenTo.value ? this.listenTo.value.length : 0;
      this.maxlength = this.listenTo.maxlength;
      this._inputChangeSubscription = this.listenTo.kirbyChange.subscribe((value) => {
        this.length = value.length;
      });
    }
  }

  ngOnDestroy(): void {
    if (this._inputChangeSubscription) {
      this._inputChangeSubscription.unsubscribe();
    }
  }
}
