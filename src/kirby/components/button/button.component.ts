import { Component, Input, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
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
}
