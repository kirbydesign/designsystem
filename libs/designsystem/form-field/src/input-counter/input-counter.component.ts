import { Component, Inject, Input, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, map, skip, Subscription, tap } from 'rxjs';

import { InputComponent } from '../input/input.component';

import { TextareaComponent } from './../textarea/textarea.component';

@Component({
  selector: 'kirby-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrls: ['./input-counter.component.scss'],
  standalone: false,
})
export class InputCounterComponent implements OnInit, OnDestroy {
  @Input() listenTo: InputComponent | TextareaComponent;
  length: number;
  maxlength: number | undefined;
  private _inputChangeSubscription: Subscription;
  textToAnnounce: string;
  lastAnnouncedLength: number;

  get text(): string {
    if (this.length === undefined) {
      return undefined;
    }
    const ofMaxlength = this.maxlength ? `/${this.maxlength}` : '';
    return `${this.length}${ofMaxlength}`;
  }

  constructor(@Inject(LOCALE_ID) locale: string) {}

  ngOnInit(): void {
    if (this.listenTo) {
      this.length = this.listenTo.value ? this.listenTo.value.length : 0;
      this.maxlength = this.maxlength = this.listenTo.maxlength
        ? +this.listenTo.maxlength
        : undefined;

      this._inputChangeSubscription = this.listenTo.kirbyChange
        .pipe(
          skip(1),
          tap((value) => (this.length = value?.length || 0)),
          debounceTime(1000)
        )
        .subscribe((_) => {
          this.announceText();
        });
    }
  }

  ngOnDestroy(): void {
    this._inputChangeSubscription?.unsubscribe();
  }

  announceText(): void {
    if (this.maxlength === undefined) {
      this.textToAnnounce = this.length + ' characters entered';
    } else {
      if (this.maxlength === this.length) {
        this.textToAnnounce = 'maximum characters reached';
      } else {
        const lengthDiff = this.maxlength - this.length;
        this.textToAnnounce = `${lengthDiff} character${lengthDiff === 1 ? '' : 's'} remaining`;
      }
    }
  }
}
