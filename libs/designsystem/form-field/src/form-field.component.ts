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
import { ResizeObserverService } from '@kirbydesign/designsystem/shared';
import { FormFieldControl, WindowRef } from '@kirbydesign/designsystem/types';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AffixDirective } from './directives/affix/affix.directive';
import { DateInputDirective } from './directives/date/date-input.directive';
import { InputCounterComponent } from './input-counter/input-counter.component';
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
  private nestedInteractiveElement: HTMLElement | null = null;
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
  @ContentChild(FormFieldControl) private _formFieldControl: FormFieldControl;
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
    return !!this.label && !!this._formFieldControl?.wrapInLabel;
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
    this._formFieldControl?.focus();
  }

  public focus() {
    if (!this._formFieldControl?.wrapInLabel) return;

    setTimeout(() => {
      const element = this._formFieldControl.getInteractiveElement();
      if (!element) return;
      if (this.isTouch) {
        // Trigger Ionic's input shims to ensure input is scrolled into view.
        // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/hacks/scroll-assist.ts
        const touchStart = new TouchEvent('touchstart');
        const touchEnd = new TouchEvent('touchend');
        element.dispatchEvent(touchStart);
        element.dispatchEvent(touchEnd);
      } else {
        element.focus();
      }
    });
  }

  ngOnInit() {
    this.isTouch = this.platform.isTouch();
  }

  ngAfterContentInit(): void {
    this.handleAffixOffset();
  }

  ngAfterContentChecked(): void {
    if (!this.nestedInteractiveElement) {
      this.registerNestedInteractive();
    }

    const inputElement = this._formFieldControl?.getInputElement();
    if (!this.isRegistered && this.element.isConnected && inputElement) {
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
    this.nestedInteractiveElement = this._formFieldControl?.getInteractiveElement() ?? null;
  }

  private setNestedInteractiveMessageAttributes() {
    if (!this.nestedInteractiveElement) return;

    if (this.message) {
      // When there's an error the message div's id switches to _errorMessageId, so
      // aria-describedby must follow to ensure screen readers (e.g. VoiceOver) can
      // still find and announce the message text.
      const describedById = this._nestedInteractiveHasError
        ? this._errorMessageId
        : this._messageId;
      this.renderer.setAttribute(this.nestedInteractiveElement, 'aria-describedby', describedById);
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
    if (!this._formFieldControl) return;

    this._nestedInteractiveHasError = !!this._formFieldControl.hasError;
    this.nestedInteractiveErrorSubscription = this._formFieldControl.hasErrorChange.subscribe(
      (hasError) => {
        this._nestedInteractiveHasError = hasError;
        this.setNestedInteractiveMessageAttributes();
        this.cdr.markForCheck();
      }
    );
  }

  private shouldShowDefaultCalendarIcon() {
    return (
      this.dateInput?.useNativeDatePicker &&
      !this.affixElements.some((affix) => affix.type === 'suffix')
    );
  }

  private handleAffixOffset() {
    const inputElement = this._formFieldControl?.getInputElement();
    if (inputElement) {
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
