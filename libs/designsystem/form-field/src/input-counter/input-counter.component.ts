import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, filter, skip, Subscription, tap } from 'rxjs';

import { TranslationService } from '@kirbydesign/designsystem/shared';
import { UntypedFormBuilder } from '@angular/forms';
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
  skipAnnouncement = false;

  get text(): string {
    if (this.length === undefined) {
      return undefined;
    }
    const ofMaxlength = this.maxlength ? `/${this.maxlength}` : '';
    return `${this.length}${ofMaxlength}`;
  }

  constructor(private translations: TranslationService) {}

  ngOnInit(): void {
    if (this.listenTo) {
      this.length = this.listenTo.value ? this.listenTo.value.length : 0;
      this.skipAnnouncement = this.length > 0; //If there is already text in the input, skip the first announcement so we don't announce on refresh or prefilled text fields.
      this.maxlength = this.maxlength = this.listenTo.maxlength
        ? +this.listenTo.maxlength
        : undefined;
      this._inputChangeSubscription = this.listenTo.kirbyChange
        .pipe(
          tap((value) => (this.length = value?.length || 0)),
          filter((_) => {
            if (this.skipAnnouncement) {
              this.skipAnnouncement = false;
              return false;
            }
            return true;
          }),
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
    const characters = this.translations.get('characters');
    if (this.maxlength === undefined) {
      const entered = this.translations.get('entered');
      this.textToAnnounce = `${this.length} ${characters} ${entered}`;
    } else {
      const outOf = this.translations.get('outOf');
      this.textToAnnounce = `${characters} ${this.length} ${outOf} ${this.maxlength}`;
    }
  }
}
