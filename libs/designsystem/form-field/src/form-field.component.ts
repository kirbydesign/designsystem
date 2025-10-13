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
import { WindowRef } from '@kirbydesign/designsystem/types';
import { Subscription } from 'rxjs';
import { AffixDirective } from './directives/affix/affix.directive';
import { DateInputDirective } from './directives/date/date-input.directive';
import { InputCounterComponent } from './input-counter/input-counter.component';
import { InputComponent } from './input/input.component';

import { TextareaComponent } from './textarea/textarea.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  standalone: false,
})
export class FormFieldComponent
  implements AfterContentChecked, AfterContentInit, OnInit, OnDestroy
{
  private isRegistered = false;
  private element: HTMLElement;
  private isTouch: boolean;
  private nestedInteractiveElement:
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLIonRadioGroupElement;
  private nestedInteractiveErrorSubscription: Subscription;
  private _message: string | null;

  showDefaultCalendarIcon = false;

  _nestedInteractiveHasError: boolean;
  _labelId = UniqueIdGenerator.scopedTo('kirby-form-field-label').next();
  _errorMessageId = UniqueIdGenerator.scopedTo('kirby-form-field-message').next();
  _messageId = UniqueIdGenerator.scopedTo('kirby-form-field-message').next();

  @Input() label: string;
  @Input() get message(): string | null {
    return this._message;
  }

  set message(value: string | null) {
    this._message = value;
    this.setNestedInteractiveElementAttributes();
  }

  @ContentChildren(AffixDirective) affixElements: QueryList<AffixDirective>;
  @ContentChild(InputCounterComponent, { static: false }) counter: InputCounterComponent;
  @ContentChild(RadioGroupComponent) private radioGroupComponent: RadioGroupComponent;
  @ContentChild(InputComponent) inputComponent: InputComponent;
  @ContentChild(TextareaComponent) textareaComponent: TextareaComponent;
  @ContentChild(RadioGroupComponent, { read: ElementRef })
  private radioGroupElement: ElementRef<HTMLElement>;
  @ContentChild(InputComponent, { read: ElementRef }) input: ElementRef<HTMLInputElement>;
  @ContentChild(TextareaComponent, { read: ElementRef }) textarea: ElementRef<HTMLTextAreaElement>;

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
    return !!this.label && (!!this.input || !!this.textarea);
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
    this.radioGroupComponent?.focus();
  }

  public focus() {
    if (!this.nestedInteractiveElement) return;
    if (!(this.input || this.textarea)) return;

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
    // Measure the width of all slotted affix elements,
    // and apply their width + standard padding to the input elements
    // padding, so the start/end of the input is correctly indented.
    if (this.input) {
      this.affixElements.forEach((affix) => {
        this.resizeObserverService.observe(affix.el, (entry) => {
          const padding = affix.type === 'prefix' ? 'padding-left' : 'padding-right';
          const affixWidth = this.input.nativeElement.type === 'date' ? 0 : entry.contentRect.width;
          const existingPadding = parseInt(DesignTokenHelper.size('s'));

          this.renderer.setStyle(
            this.input.nativeElement,
            `${padding}`,
            `${affixWidth + existingPadding}px`
          );
        });
      });
    }
  }

  ngAfterContentChecked(): void {
    if (!this.nestedInteractiveElement) {
      this.registerNestedInteractive();
    }

    if (!this.isRegistered && this.element.isConnected && (this.input || this.textarea)) {
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

    this.affixElements.forEach((affix) => {
      this.resizeObserverService.unobserve(affix.el);
    });

    this.nestedInteractiveErrorSubscription?.unsubscribe();
  }

  private registerNestedInteractive() {
    this.getNestedInteractiveElement();
    this.setNestedInteractiveElementAttributes();
    this.subscribeToNestedInteractiveError();
  }

  private getNestedInteractiveElement() {
    this.nestedInteractiveElement =
      this.input?.nativeElement ||
      this.textarea?.nativeElement ||
      this.radioGroupElement?.nativeElement.querySelector('ion-radio-group');
  }

  private setNestedInteractiveElementAttributes() {
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
    }

    if (this.label && this.radioGroupElement) {
      this.renderer.setAttribute(this.nestedInteractiveElement, 'aria-labelledby', this._labelId);
    }
  }

  private subscribeToNestedInteractiveError() {
    const nestedInteractiveComponent =
      this.inputComponent || this.textareaComponent || this.radioGroupComponent;

    // set current value, then listen for changes
    this._nestedInteractiveHasError = !!nestedInteractiveComponent?.hasError;
    this.nestedInteractiveErrorSubscription = nestedInteractiveComponent?.hasErrorChange.subscribe(
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
}
