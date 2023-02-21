import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

import { NotificationColor } from '@kirbydesign/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';

export enum ButtonSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export type AttentionLevel = '1' | '2' | '3' | '4';

const ATTENTION_LEVEL_4_DEPRECATION_WARNING =
  'Deprecation warning: The "kirby-button" support for using input property "attentionLevel" with the value "4" will be removed in a future release of Kirby designsystem. While deprecated, all attention-level 4 buttons will be rendered as attention-level 3.';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterContentInit {
  @HostBinding('class.attention-level1')
  isAttentionLevel1: boolean = true; // Default
  @HostBinding('class.attention-level2')
  isAttentionLevel2: boolean;
  @HostBinding('class.attention-level3')
  isAttentionLevel3: boolean;
  @Input() set attentionLevel(level: AttentionLevel) {
    this.isAttentionLevel1 = level === '1';
    this.isAttentionLevel2 = level === '2';
    this.isAttentionLevel3 = level === '3' || level === '4';
    if (level === '4') {
      console.warn(ATTENTION_LEVEL_4_DEPRECATION_WARNING);
    }
  }

  @HostBinding('class.no-decoration')
  hasNoDecoration = false;
  @Input()
  set noDecoration(enable: boolean) {
    this.hasNoDecoration = enable;
    this.isAttentionLevel1 = !enable;
    this.isAttentionLevel2 = false;
    this.isAttentionLevel3 = false;
  }

  @HostBinding('class.floating')
  public get isButtonFloating(): boolean {
    return this.isFloating;
  }

  @HostBinding('class.icon-only')
  public get isIconOnly(): boolean {
    return !!this.icon && !this.hasText;
  }
  private _isIconLeft = false;
  @HostBinding('class.icon-left')
  public get isIconLeft() {
    return this._isIconLeft;
  }
  private _isIconRight = false;
  @HostBinding('class.icon-right')
  public get isIconRight() {
    return this._isIconRight;
  }

  @HostBinding('class')
  get _cssClass() {
    return [this.themeColor, this.size].filter((cssClass) => !!cssClass);
  }

  @Input()
  themeColor: NotificationColor;
  @Input() expand: 'full' | 'block';
  @Input() isFloating: boolean = false;
  @Input()
  size: ButtonSize | `${ButtonSize}` = ButtonSize.MD;

  @ContentChild(IconComponent) icon: IconComponent;
  @ContentChild(IconComponent, { read: ElementRef })
  iconElementRef: ElementRef<HTMLElement>;
  private hasText = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    this.hasText = !!this.elementRef.nativeElement.textContent;
    if (this.iconElementRef !== undefined && this.hasText) {
      this._isIconLeft =
        this.elementRef.nativeElement.querySelector('.content-layer').firstChild ===
        this.iconElementRef.nativeElement;
      this._isIconRight = !this._isIconLeft;
    }
  }
}
