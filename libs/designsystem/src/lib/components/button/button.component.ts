import {
  Component,
  Input,
  HostBinding,
  ContentChild,
  AfterContentInit,
  ElementRef,
} from '@angular/core';

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
    return this.icon && !this._hasSlottedContent;
  }
  @HostBinding('class.icon-left')
  private _isIconLeft = false;
  @HostBinding('class.icon-right')
  private _isIconRight = false;

  @Input() set attentionLevel(level: '1' | '2' | '3' | '4') {
    this.isAttentionLevel1 = level === '1';
    this.isAttentionLevel2 = level === '2';
    this.isAttentionLevel3 = level === '3';
    this.isAttentionLevel4 = level === '4';
  }
  @Input() set isDestructive(state: boolean) {
    this.destructive = state;
  }
  @Input() expand?: 'full' | 'block';
  @Input() text?: string;
  @Input() isFloating?: boolean = false;

  @ContentChild(IconComponent, { static: false }) icon: IconComponent;
  @ContentChild(IconComponent, { static: false, read: ElementRef })
  iconDomNode: ElementRef;
  private _hasSlottedContent = false;

  ngAfterContentInit(): void {
    if (this.iconDomNode && this.iconDomNode.nativeElement) {
      const prev = this.iconDomNode.nativeElement.previousSibling;
      const next = this.iconDomNode.nativeElement.nextSibling;
      if (prev && prev.nodeName !== '#comment') {
        this._hasSlottedContent = true;
        this._isIconLeft = false;
        this._isIconRight = true;
      }
      if (next && next.nodeName !== '#comment') {
        this._hasSlottedContent = true;
        this._isIconLeft = true;
        this._isIconRight = false;
      }
    }
  }
}
