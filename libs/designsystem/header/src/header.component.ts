import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injector,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { ACTIONGROUP_CONFIG, ActionGroupConfig } from '@kirbydesign/designsystem/action-group';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

@Directive({
  selector: '[kirbyHeaderActions]',
})
export class HeaderActionsDirective {}

@Directive({
  selector: '[kirbyHeaderCustomSection]',
})
export class HeaderCustomSectionDirective {}

@Directive({
  selector: '[kirbyHeaderTitleActionIcon]',
})
export class HeaderTitleActionIconDirective {}

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterContentChecked, OnInit {
  @HostBinding('class.centered')
  @Input()
  centered?: boolean;

  @Input() titleMaxLines: number;
  @Input() emphasizeActions = false;

  fitHeadingConfig: FitHeadingConfig;

  @ViewChild('avatarContainerElement', { read: ElementRef })
  avatarContainerElement: ElementRef<HTMLDivElement>;

  @ViewChild('titleElement', { read: ElementRef })
  titleElement?: ElementRef<HTMLHeadingElement>;

  @ViewChild('actionsElement', { read: ElementRef })
  actionsElement?: ElementRef<HTMLDivElement>;

  @ContentChild(HeaderActionsDirective, { read: TemplateRef<HeaderActionsDirective> })
  actionsTemplate?: TemplateRef<HeaderActionsDirective>;

  @ContentChild(HeaderCustomSectionDirective, { read: TemplateRef<HeaderCustomSectionDirective> })
  customSectionTemplate?: TemplateRef<HeaderCustomSectionDirective>;

  @ContentChild(HeaderTitleActionIconDirective, { read: TemplateRef })
  titleActionIconTemplate: TemplateRef<HeaderTitleActionIconDirective>;

  @Input() title: string = null;
  @Input() value: string = null;
  @Input() valueUnit: string = null;
  @Input() subtitle1: string = null;
  @Input() subtitle2: string = null;
  @Input() hasInteractiveTitle?: boolean;

  @Output() titleClick = new EventEmitter<PointerEvent>();

  public onTitleClick(event: PointerEvent) {
    this.titleClick.emit(event);
  }

  public avatarReadyToRenderAfterContentProjection: boolean = false;

  public _actionGroupInjector: Injector;

  private actionGroupConfig: ActionGroupConfig;

  constructor(private injector: Injector) {}

  public ngOnInit(): void {
    this.initActionGroupInjector();

    if (this.titleMaxLines > 0) {
      this.fitHeadingConfig = {
        maxLines: this.titleMaxLines,
      };
    }
  }

  public ngAfterContentChecked(): void {
    this.onPotentialAvatarRendered();
  }

  private initActionGroupInjector(): void {
    this.actionGroupConfig = {
      defaultVisibleActions: this.emphasizeActions ? undefined : 1,
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

  private onPotentialAvatarRendered(): void {
    // If an avatar is present we default to centered layout - unless configured otherwise:
    const avatarPresent: boolean = this.avatarContainerElement?.nativeElement.children.length > 0;
    if (avatarPresent && this.centered === undefined) {
      this.centered = true;
    }

    if (this.centered) {
      this.actionGroupConfig.isCondensed = true;
    }

    this.avatarReadyToRenderAfterContentProjection = true;
  }
}
