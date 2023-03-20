import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

import { NotificationColor } from '@kirbydesign/core';

import { IconComponent } from '@kirbydesign/designsystem/icon';

export enum ButtonSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const ATTENTION_LEVEL_4_DEPRECATION_WARNING =
  'Deprecation warning: The "kirby-button" support for using input property "attentionLevel" with the value "4" will be removed in a future release of Kirby designsystem. While deprecated, all attention-level 4 buttons will be rendered as attention-level 3.';

@Component({
  standalone: true,
  imports: [CommonModule],
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
  @Input() set attentionLevel(level: '1' | '2' | '3' | '4') {
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
    return !!this.iconElementRef && this.showIconOnly;
  }
  private _isIconLeft = false;
  @HostBinding('class.icon-left')
  public get isIconLeft() {
    return this._isIconLeft && !this.showIconOnly;
  }
  private _isIconRight = false;
  @HostBinding('class.icon-right')
  public get isIconRight() {
    return this._isIconRight && !this.showIconOnly;
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

  private _showIconOnly: boolean = false;
  get showIconOnly() {
    return this._showIconOnly;
  }
  @Input() set showIconOnly(value: boolean) {
    if (value) {
      // If the button text is supplied as plain text (i.e. as a text node not within an element tag),
      // we need to wrap it in an element to be able to target and hide it with css:
      this.wrapTextNode(this.iconElementRef?.nativeElement);
    }
    this._showIconOnly = value;
  }

  @ContentChild(IconComponent, { read: ElementRef })
  iconElementRef?: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  private wrapTextNode(iconElement?: HTMLElement) {
    if (!iconElement) {
      return;
    }

    const ifTextNode = (node?: ChildNode): ChildNode | undefined => {
      return node?.nodeType === Node.TEXT_NODE ? node : undefined;
    };

    const textNode = ifTextNode(iconElement.previousSibling) || ifTextNode(iconElement.nextSibling);
    if (textNode) {
      const placement = textNode === iconElement.previousSibling ? 'before' : 'after';
      const textWrapper = this.renderer.createElement('span');
      const parent = textNode.parentNode;
      this.renderer.removeChild(textNode.parentNode, textNode);
      this.renderer.appendChild(textWrapper, textNode);
      if (placement === 'before') {
        this.renderer.insertBefore(parent, textWrapper, iconElement);
      } else if (placement === 'after') {
        this.renderer.appendChild(parent, textWrapper);
      }
    }
  }

  ngAfterContentInit(): void {
    const iconElement = this.iconElementRef?.nativeElement;

    if (iconElement === undefined) {
      // Nothing to do here when there's no icon:
      return;
    }

    const hasText = !!this.elementRef.nativeElement.textContent;
    if (!hasText) {
      // Button doesn't contain any text, make it round:
      this._showIconOnly = true;
    }

    if (hasText && !this.showIconOnly) {
      this._isIconLeft =
        this.elementRef.nativeElement.querySelector('.content-layer').firstChild === iconElement;
      this._isIconRight = !this._isIconLeft;
    }
  }
}
