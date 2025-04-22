import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { InputComponent } from '../input/input.component';

import { TextareaComponent } from './../textarea/textarea.component';

@Component({
  selector: 'kirby-input-counter',
  templateUrl: './input-counter.component.html',
  standalone: false,
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
        this.length = value?.length || 0;
      });
    }
  }

  ngOnDestroy(): void {
    if (this._inputChangeSubscription) {
      this._inputChangeSubscription.unsubscribe();
    }
  }
}
