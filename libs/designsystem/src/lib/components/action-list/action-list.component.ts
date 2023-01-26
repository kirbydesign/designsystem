import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, IconSize } from '@kirbydesign/designsystem/icon';
import { ThemeColor } from '@kirbydesign/core';
import { AttentionLevel, ButtonComponent, ButtonSize } from '../button/button.component';
import { ListModule } from '../list/list.module';
import { FloatingDirective } from './../../directives/floating/floating.directive';
import { ThemeColorDirective } from './../../directives/theme-color/theme-color.directive';

@Component({
  selector: 'kirby-action-list',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    FloatingDirective,
    IconModule,
    ThemeColorDirective,
    ListModule,
  ],
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css'],
})
export class ActionListComponent {
  @Input() public disabled: boolean = false;
  @Input() public size: ButtonSize = ButtonSize.MD;
  @Input() public themeColor: ThemeColor = 'warning';
  @Input() public iconSize: IconSize = IconSize.SM;
  @Input() public attentionLevel: AttentionLevel = '3';
}
