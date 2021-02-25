import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { PlatformService } from '../../helpers/platform.service';
import { UniqueIdGenerator } from '../../helpers/unique-id-generator.helper';
import { WindowRef } from '../../types/window-ref';
import { RadioGroupComponent } from '../radio/radio-group/radio-group.component';

import { InputCounterComponent } from './input-counter/input-counter.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent
  implements AfterContentChecked, AfterContentInit, OnInit, OnDestroy {
  private isRegistered = false;
  private element: HTMLElement;
  private inputElement: HTMLInputElement | HTMLTextAreaElement;
  private isTouch: boolean;
  _labelId = UniqueIdGenerator.scopedTo('kirby-form-field-label').next();

  @Input() label: string;
  @Input() message: string;

  @ContentChild(InputCounterComponent, { static: false }) counter: InputCounterComponent;
  @ContentChild(RadioGroupComponent) private radioGroupComponent: RadioGroupComponent;
  @ContentChild(RadioGroupComponent, { read: ElementRef }) private radioGroupElement: ElementRef<
    HTMLElement
  >;

  @ContentChild(InputComponent, { read: ElementRef }) input: ElementRef<HTMLInputElement>;
  @ContentChild(TextareaComponent, { read: ElementRef }) textarea: ElementRef<HTMLTextAreaElement>;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private platform: PlatformService,
    private renderer: Renderer2,
    private window: WindowRef
  ) {
    this.element = elementRef.nativeElement;
  }

  get _wrapContentInLabel(): boolean {
    return !!this.label && (!!this.input || !!this.textarea);
  }

  private dispatchLoadEvent() {
    // Dispatch an `ionInputDidLoad` event to register
    // form field + input/textarea with Ionic input shims
    // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/input-shims.ts
    this.window.document.dispatchEvent(
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
    this.radioGroupComponent && this.radioGroupComponent.focus();
  }

  public focus() {
    if (!this.inputElement) return;

    if (this.isTouch) {
      // Trigger Ionic's input shims to ensure input is scrolled into view.
      // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/hacks/scroll-assist.ts
      const touchStart = new TouchEvent('touchstart');
      const touchEnd = new TouchEvent('touchend');
      this.inputElement.dispatchEvent(touchStart);
      this.inputElement.dispatchEvent(touchEnd);
    } else {
      this.inputElement.focus();
    }
  }

  ngOnInit() {
    this.isTouch = this.platform.isTouch();
  }

  ngAfterContentInit(): void {
    if (this.label && this.radioGroupElement) {
      this.renderer.setAttribute(
        this.radioGroupElement.nativeElement,
        'aria-labelledby',
        this._labelId
      );
    }
  }

  ngAfterContentChecked(): void {
    if (!this.inputElement) {
      this.inputElement = this.element.querySelector('input, textarea');
    }

    // TODO: remove "!this.inputElement.readOnly" when ionic has fixed input click issue
    // https://github.com/ionic-team/ionic-framework/issues/22740
    if (
      !this.isRegistered &&
      this.element.isConnected &&
      !!this.inputElement &&
      !this.inputElement.readOnly
    ) {
      // Host is connected to dom and slotted input/textarea is present:
      this.isRegistered = true;
      this.dispatchLoadEvent();
    }
  }

  ngOnDestroy(): void {
    // Dispatch an `ionInputDidUnload` event to unregister
    // form field + input/textarea from Ionic input shims
    // See: https://github.com/ionic-team/ionic-framework/blob/master/core/src/utils/input-shims/input-shims.ts
    this.window.document.dispatchEvent(
      new CustomEvent('ionInputDidUnload', {
        detail: this.element,
      })
    );
  }
}
