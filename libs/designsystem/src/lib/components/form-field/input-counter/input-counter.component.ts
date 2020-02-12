import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { InputComponent } from '../input/input.component';

@Component({
  selector: 'kirby-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.scss'],
})
export class InputCounterComponent implements OnInit, OnDestroy {
  @Input() listenTo: InputComponent;
  length: number;
  maxlength: number;
  private _inputChangeSubscription: Subscription;

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
