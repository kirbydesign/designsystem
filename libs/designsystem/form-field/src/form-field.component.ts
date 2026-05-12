import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
} from '@angular/core';
import {
  DesignTokenHelper,
  PlatformService,
  UniqueIdGenerator,
} from '@kirbydesign/designsystem/helpers';
import { RadioGroupComponent } from '@kirbydesign/designsystem/radio';
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { FORM_FIELD_CONTROL, FormFieldControl, WindowRef } from '@kirbydesign/designsystem/types';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AffixDirective } from './directives/affix/affix.directive';
import { DateInputDirective } from './directives/date/date-input.directive';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { InputComponent } from './input/input.component';

import { TextareaComponent } from './textarea/textarea.component';
import { FormFieldMessageComponent } from './form-field-message/form-field-message.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  imports: [NgTemplateOutlet, FormFieldMessageComponent, IconComponent],
})
export class FormFieldComponent
  implements AfterContentChecked, AfterContentInit, OnInit, OnDestroy
{
  private isRegistered = false;
  private element: HTMLElement;
  private isTouch: boolean;
  private nestedInteractiveElement: HTMLElement;
  private nestedInteractiveErrorSubscription: Subscription;
  private _message: string | null | undefined;
  private _label: string | undefined;

  showDefaultCalendarIcon = false;

  _nestedInteractiveHasError: boolean;
  _labelId = UniqueIdGenerator.scopedTo('kirby-form-field-label').next();
  _errorMessageId = UniqueIdGenerator.scopedTo('kirby-form-field-message').next();
  _messageId = UniqueIdGenerator.scopedTo('kirby-form-field-message').next();

  @Input() get label(): string | undefined {
    return this._label;
  }

  set label(value: string | undefined) {
    this._label = value;
    this.setNestedInteractiveLabelAttributes();
  }

  @Input() get message(): string | null | undefined {
    return this._message;
  }

  set message(value: string | null | undefined) {
    this._message = value;
    this.setNestedInteractiveMessageAttributes();
  }

  @ContentChildren(AffixDirective) affixElements: QueryList<AffixDirective>;
  @ContentChild(InputCounterComponent, { static: false }) counter: InputCounterComponent;

  @ContentChild(FORM_FIELD_CONTROL) private formFieldControl: FormFieldControl;
  @ContentChild(DateInputDirective) dateInput: DateInputDirective;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private platform: PlatformService,
    private renderer: Renderer2,
    private windowRef: WindowRef,
    private resizeObserverService: ResizeObserverService,
    private cdr: ChangeDetectorRef
  ) {
    this.element = elementRef.nativeElement;
  }

  @HostBinding('class.wrap-content-in-label')
  get _wrapContentInLabel(): boolean {
    return (
      !!this.label &&
      (this.formFieldControl instanceof InputComponent ||
        this.formFieldControl instanceof TextareaComponent)
    );
  }

  private dispatchLoadEvent() {
    // Dispatch an `ionInputDidLoad` event to register
    // form field + input/textarea with Ionic input shims
    // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/input-shims.ts
    this.windowRef.nativeWindow.document.dispatchEvent(
      new CustomEvent('ionInputDidLoad', {
        detail: this.element,
      })
    );
  }

  @HostListener('kirbyRegisterFormField')
  _onRegisterFormField() {
    this.dispatchLoadEvent();
  }

  onLabelClick() {
    // If its a radio group its focus method that contains advanced logic
    if (this.formFieldControl instanceof RadioGroupComponent) {
      this.formFieldControl.focus();
    } else {
      this.nestedInteractiveElement?.focus();
    }
  }

  public focus() {
    if (!this.nestedInteractiveElement) return;
    if (
      !(this.formFieldControl instanceof InputComponent) &&
      !(this.formFieldControl instanceof TextareaComponent)
    )
      return;

    /*
     * This timeout ensures that any previous manipulation of inputElement
     * (e.g. setting disabled state) has been synced to the DOM before trying to focus.
     */
    setTimeout(() => {
      if (this.isTouch) {
        // Trigger Ionic's input shims to ensure input is scrolled into view.
        // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/hacks/scroll-assist.ts
        const touchStart = new TouchEvent('touchstart');
        const touchEnd = new TouchEvent('touchend');
        this.nestedInteractiveElement.dispatchEvent(touchStart);
        this.nestedInteractiveElement.dispatchEvent(touchEnd);
      } else {
        this.nestedInteractiveElement.focus();
      }
    });
  }

  ngOnInit() {
    this.isTouch = this.platform.isTouch();
  }

  ngAfterContentInit(): void {
    this.handleAffixOffset();
  }

  private hasWarnedMissingControl = false;

  ngAfterContentChecked(): void {
    if (!this.formFieldControl) {
      if (!this.hasWarnedMissingControl) {
        this.hasWarnedMissingControl = true;
        console.warn(
          'kirby-form-field: No form field control found. Ensure a component providing FORM_FIELD_CONTROL is projected.'
        );
      }
      return;
    }

    if (!this.nestedInteractiveElement) {
      this.registerNestedInteractive();
    }

    if (
      !this.isRegistered &&
      this.element.isConnected &&
      (this.formFieldControl instanceof InputComponent ||
        this.formFieldControl instanceof TextareaComponent)
    ) {
      // Host is connected to dom and slotted input/textarea is present:
      this.isRegistered = true;
      this.dispatchLoadEvent();
    }

    // Decide if default calendar icon for date input should be shown
    this.showDefaultCalendarIcon = this.shouldShowDefaultCalendarIcon();
  }

  ngOnDestroy(): void {
    // Dispatch an `ionInputDidUnload` event to unregister
    // form field + input/textarea from Ionic input shims
    // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/input-shims.ts
    this.windowRef.nativeWindow.document.dispatchEvent(
      new CustomEvent('ionInputDidUnload', {
        detail: this.element,
      })
    );

    this.affixElements?.forEach((affix) => {
      this.resizeObserverService.unobserve(affix.el);
    });

    this.nestedInteractiveErrorSubscription?.unsubscribe();
  }

  private registerNestedInteractive() {
    this.getNestedInteractiveElement();
    this.setNestedInteractiveLabelAttributes();
    this.setNestedInteractiveMessageAttributes();
    this.subscribeToNestedInteractiveError();
  }

  private getNestedInteractiveElement() {
    this.nestedInteractiveElement = this.formFieldControl.interactiveElement;
  }

  private setNestedInteractiveMessageAttributes() {
    if (!this.nestedInteractiveElement) return;

    if (this.message) {
      this.renderer.setAttribute(
        this.nestedInteractiveElement,
        'aria-describedby',
        this._messageId
      );

      this.renderer.setAttribute(
        this.nestedInteractiveElement,
        'aria-errormessage',
        this._errorMessageId
      );
    } else {
      this.renderer.removeAttribute(this.nestedInteractiveElement, 'aria-describedby');
      this.renderer.removeAttribute(this.nestedInteractiveElement, 'aria-errormessage');
    }
  }

  private setNestedInteractiveLabelAttributes() {
    if (!this.nestedInteractiveElement) return;
    if (this._wrapContentInLabel) return; // return if label is wrapping the nested interactive. No need for aria-labelledby.

    if (this.label) {
      this.renderer.setAttribute(this.nestedInteractiveElement, 'aria-labelledby', this._labelId);
    } else {
      this.renderer.removeAttribute(this.nestedInteractiveElement, 'aria-labelledby');
    }
  }

  private subscribeToNestedInteractiveError() {
    // set current value, then listen for changes
    this._nestedInteractiveHasError = !!this.formFieldControl?.hasError;
    this.nestedInteractiveErrorSubscription = this.formFieldControl?.hasErrorChange.subscribe(
      (hasError) => {
        this._nestedInteractiveHasError = hasError;
        this.cdr.markForCheck();
      }
    );
  }

  private shouldShowDefaultCalendarIcon() {
    return (
      this.dateInput?.useNativeDatePicker &&
      !this.affixElements.some((affix) => affix.type === 'suffix') // there are no suffix elements
    );
  }

  private handleAffixOffset() {
    // Measure the width of all slotted affix elements,
    // and apply their width + standard padding to the input elements
    // padding, so the start/end of the input is correctly indented.
    if (this.formFieldControl instanceof InputComponent) {
      const inputElement = this.formFieldControl.interactiveElement as HTMLInputElement;
      this.affixElements.forEach((affix) => {
        this.resizeObserverService.observe(affix.el, (entry) => {
          const padding = affix.type === 'prefix' ? 'padding-left' : 'padding-right';
          const affixWidth = inputElement.type === 'date' ? 0 : entry.contentRect.width;
          const existingPadding = parseInt(DesignTokenHelper.size('s'));

          this.renderer.setStyle(inputElement, `${padding}`, `${affixWidth + existingPadding}px`);

          const dateMask = this.element.querySelector('.date-mask');
          if (dateMask) {
            this.renderer.setStyle(dateMask, `${padding}`, `${affixWidth + existingPadding}px`);
          }
        });
      });
    }
  }
}
