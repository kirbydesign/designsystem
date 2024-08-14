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

export type AttentionLevel = '1' | '2' | '3';

@Component({
  standalone: true,
  imports: [CommonModule],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[kirby-button],Button[kirby-button],a[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterContentInit {
  @Input() attentionLevel: AttentionLevel;

  @HostBinding('class.no-decoration')
  @Input()
  noDecoration = false;

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
    const attentionLevel = this.getAttentionLevelCssClass();
    return [this.themeColor, this.size, attentionLevel].filter((cssClass) => !!cssClass);
  }

  private getAttentionLevelCssClass() {
    if (this.noDecoration) return;
    const attentionLevelDefault: AttentionLevel = '1';
    return `attention-level${this.attentionLevel || attentionLevelDefault}`;
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

    // Ensure buttons with icon is always shown as icon only inside the toolbar:
    if (this.elementRef.nativeElement.closest('ion-toolbar')) {
      this._showIconOnly = true;
    }

    if (this.showIconOnly) {
      // If the button text is supplied as plain text (i.e. as a text node not within an element tag),
      // we need to wrap it in an element to be able to target and hide it with css:
      this.wrapTextNode(iconElement);
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
