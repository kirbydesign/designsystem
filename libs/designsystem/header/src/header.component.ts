import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ACTIONGROUP_CONFIG, ActionGroupConfig } from '@kirbydesign/designsystem/action-group';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

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
export class HeaderComponent implements AfterContentInit, OnInit {
  @HostBinding('class.centered')
  @Input()
  centered?: boolean;

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

  constructor(private injector: Injector) {}

  ngOnInit(): void {
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

    if (this.titleMaxLines > 0) {
      this.fitHeadingConfig = {
        maxLines: this.titleMaxLines,
      };
    }
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
}
