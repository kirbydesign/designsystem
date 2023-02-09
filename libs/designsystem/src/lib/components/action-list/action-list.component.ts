import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, IconSize } from '@kirbydesign/designsystem/icon';
import { ThemeColor } from '@kirbydesign/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { Placement } from '@floating-ui/core/src/types';
import { AttentionLevel, ButtonComponent, ButtonSize } from '../button/button.component';
import { FloatingDirective, FloatingOffset } from './../../directives/floating/floating.directive';

@Component({
  selector: 'kirby-action-list',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    FloatingDirective,
    IconModule,
    ThemeColorDirective,
    CardModule,
    ItemModule,
  ],
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionListComponent {
  @Input() public isDisabled: boolean = false;

  @Input() public themeColor: ThemeColor = 'dark';
  @Input() public iconSize: IconSize = IconSize.SM;
  @Input() public attentionLevel: AttentionLevel = '3';
  @Input() public buttonSize: ButtonSize = ButtonSize.MD;

  @Input() public placement: Placement = 'bottom-start';
  @Input() public autoPlacement: boolean = false;
  @Input() public closeOnSelect: boolean = true;
  @Input() public closeOnEscapeKey: boolean = true;
  @Input() public closeOnBackdrop: boolean = true;

  @ViewChild(ButtonComponent, { static: true, read: ElementRef })
  public buttonElement: ElementRef<HTMLElement>;

  public FloatingOffset: typeof FloatingOffset = FloatingOffset;
}
