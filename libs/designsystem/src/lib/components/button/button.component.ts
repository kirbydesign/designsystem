import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

import { NotificationColor } from '../../helpers';
import { IconComponent } from '../icon/icon.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements AfterContentInit {
  @HostBinding('class.attention-level1')
  isAttentionLevel1: boolean = true; // Default
  @HostBinding('class.attention-level2')
  isAttentionLevel2: boolean;
  @HostBinding('class.attention-level3')
  isAttentionLevel3: boolean;
  @HostBinding('class.attention-level4')
  isAttentionLevel4: boolean;
  @HostBinding('class.destructive')
  destructive: boolean = false; // Default

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

  @Input() set attentionLevel(level: '1' | '2' | '3' | '4') {
    this.isAttentionLevel1 = level === '1';
    this.isAttentionLevel2 = level === '2';
    this.isAttentionLevel3 = level === '3';
    this.isAttentionLevel4 = level === '4';
  }
  @Input() set isDestructive(state: boolean) {
    this.destructive = state;
  }
  @HostBinding('class')
  @Input()
  themeColor: NotificationColor;
  @Input() expand: 'full' | 'block';
  @Input() text: string;
  @Input() isFloating: boolean = false;

  @ContentChild(IconComponent, { static: false }) icon: IconComponent;
  @ContentChild(IconComponent, { static: false, read: ElementRef })
  iconElementRef: ElementRef<HTMLElement>;
  private hasText = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    this.hasText = !!this.elementRef.nativeElement.textContent;
    if (this.iconElementRef !== undefined && this.hasText) {
      this._isIconLeft =
        this.elementRef.nativeElement.firstChild === this.iconElementRef.nativeElement;
      this._isIconRight = !this._isIconLeft;
    }
  }
}
