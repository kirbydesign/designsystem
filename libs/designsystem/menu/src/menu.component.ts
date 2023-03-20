import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Placement } from '@floating-ui/dom';
import { ThemeColor } from '@kirbydesign/core';

import { ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IconModule, IconSize } from '@kirbydesign/designsystem/icon';
import { AttentionLevel, ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';
import {
  FloatingDirective,
  FloatingOffset,
  TriggerEvent,
} from '@kirbydesign/designsystem/shared/floating';

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
export class MenuComponent implements AfterViewInit {
  @Input() public isDisabled: boolean = false;

  @Input() public themeColor: ThemeColor = 'dark';

  @Input() public iconSize: IconSize = IconSize.SM;

  @Input() public buttonSize: ButtonSize = ButtonSize.MD;

  @Input() public placement: Placement = 'bottom-start';

  @Input() public attentionLevel: AttentionLevel = '3';

  @Input() public triggers: Array<TriggerEvent> = ['click'];

  @Input() public DOMPortalOutlet: HTMLElement | undefined;

  @Input() public autoPlacement: boolean = false;

  @Input() public closeOnSelect: boolean = true;

  @Input() public closeOnEscapeKey: boolean = true;

  @Input() public closeOnBackdrop: boolean = true;

  @ViewChild('buttonContainer', { read: ElementRef })
  public buttonContainerElement: ElementRef<HTMLElement> | undefined;

  @ViewChild('defaultButton', { read: ElementRef })
  public defaultButtonElement: ElementRef<HTMLElement> | undefined;

  @ContentChild(ButtonComponent, { read: ElementRef }) public userProvidedButton:
    | ElementRef<HTMLElement>
    | undefined;

  public FloatingOffset: typeof FloatingOffset = FloatingOffset;

  constructor(private cdf: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.cdf.detectChanges(); // Sets the updated reference for kirby-floating
  }
}
