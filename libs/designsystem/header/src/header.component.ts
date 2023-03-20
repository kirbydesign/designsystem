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
  Injector,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ACTIONGROUP_CONFIG, ActionGroupConfig } from '@kirbydesign/designsystem/action-group';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

export type HeaderConfig = { titleMaxLines?: number };
export const HEADER_CONFIG = new InjectionToken<HeaderConfig>('header.config');

@Directive({
  selector: '[kirbyHeaderActions]',
})
export class HeaderActionsDirective {}

@Directive({
  selector: '[kirbyHeaderCustomSection]',
})
export class HeaderCustomSectionDirective {}

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

  @ContentChild(HeaderCustomSectionDirective, { read: TemplateRef<HeaderCustomSectionDirective> })
  customSectionTemplate?: TemplateRef<HeaderCustomSectionDirective>;

  @Input() title: string = null;
  @Input() value: string = null;
  @Input() valueUnit: string = null;
  @Input() subtitle1: string = null;
  @Input() subtitle2: string = null;

  _actionGroupInjector: Injector;

  private actionGroupConfig: ActionGroupConfig;

  constructor(
    private injector: Injector,
    @Optional() @Inject(HEADER_CONFIG) private config?: HeaderConfig
  ) {}

  ngOnInit(): void {
    if (this.config) {
      this.fitHeadingConfig = {
        maxLines: this.config.titleMaxLines,
      };
    }

    this.actionGroupConfig = {
      isResizable: this.emphasizeActions,
      visibleActions: this.emphasizeActions ? undefined : 1,
    };

    this._actionGroupInjector = Injector.create({
      providers: [
        {
          provide: ACTIONGROUP_CONFIG,
          useValue: this.actionGroupConfig,
        },
      ],
      parent: this.injector,
    });
  }

  ngAfterContentInit(): void {
    // If an avatar is present we default to centered layout - unless configured otherwise:
    if (this.avatar && this.centered === undefined) {
      this.centered = true;
    }

    if (this.centered) {
      this.actionGroupConfig.isCondensed = true;
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
