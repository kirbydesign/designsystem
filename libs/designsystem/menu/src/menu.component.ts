import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Placement } from '@floating-ui/dom';
import { ThemeColor } from '@kirbydesign/core';

import { ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IconModule, IconSize } from '@kirbydesign/designsystem/icon';
import { ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';
import {
  FloatingDirective,
  FloatingOffset,
} from '../../src/lib/directives/floating/floating.directive';

@Component({
  selector: 'kirby-menu',
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
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() public isDisabled: boolean = false;

  @Input() public themeColor: ThemeColor = 'dark';

  @Input() public iconSize: IconSize = IconSize.SM;

  @Input() public buttonSize: ButtonSize = ButtonSize.MD;

  @Input() public placement: Placement = 'bottom-start';

  @Input() public autoPlacement: boolean = false;

  @Input() public closeOnSelect: boolean = true;

  @Input() public closeOnEscapeKey: boolean = true;

  @Input() public closeOnBackdrop: boolean = true;

  @ViewChild(ButtonComponent, { static: true, read: ElementRef })
  public buttonElement: ElementRef<HTMLElement> | undefined;

  public FloatingOffset: typeof FloatingOffset = FloatingOffset;
}
