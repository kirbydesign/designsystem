import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

export type HeaderConfig = { titleMaxLines?: number };
export const HEADER_CONFIG = new InjectionToken<HeaderConfig>('header.config');

@Directive({
  selector: '[kirbyHeaderActions]',
})
export class HeaderActionsDirective {}

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterContentInit, OnChanges, OnInit {
  @HostBinding('class.centered')
  @Input()
  centered: boolean;

  @Input() titleMaxLines: number;
  @Input() emphasizeActions = false;

  fitHeadingConfig: FitHeadingConfig;

  @ContentChild(AvatarComponent)
  avatar: AvatarComponent;

  @ContentChild(FlagComponent)
  flag: FlagComponent;

  @ViewChild('titleElement', { read: ElementRef })
  titleElement?: ElementRef<HTMLHeadingElement>;

  @ViewChild('actionsElement', { read: ElementRef })
  actionsElement?: ElementRef<HTMLDivElement>;

  @ContentChild(HeaderActionsDirective, { read: TemplateRef<HeaderActionsDirective> })
  actionsTemplate?: TemplateRef<HeaderActionsDirective>;

  @Input() title: string = null;
  @Input() value: string = null;
  @Input() valueUnit: string = null;
  @Input() subtitle1: string = null;
  @Input() subtitle2: string = null;

  constructor(@Optional() @Inject(HEADER_CONFIG) private config?: HeaderConfig) {}

  ngOnInit(): void {
    if (this.config) {
      this.fitHeadingConfig = {
        maxLines: this.config.titleMaxLines,
      };
    }
  }

  ngAfterContentInit(): void {
    // If an avatar is present we default to centered layout - unless configured otherwise:
    if (this.avatar && this.centered === undefined) {
      this.centered = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.titleMaxLines) {
      this.fitHeadingConfig = {
        maxLines: changes.titleMaxLines.currentValue,
      };
    }
  }
}
