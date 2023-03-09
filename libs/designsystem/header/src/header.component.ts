import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'kirby-header-actions',
  template: `
    <ng-content select="button[kirby-button]"></ng-content>
    <!-- HACK temporary dummy "Show More" button, remove when header-actions can collapse... -->
    <button *ngIf="visibleActions" kirby-button attentionLevel="3">
      <kirby-icon name="more"></kirby-icon>
    </button>
  `,
  /* HACK: temporary styling to hide buttons when visibleActions > 0, remove when header-actions can collapse... */
  styles: [
    `
      :host(.visible-actions) ::ng-deep button[kirby-button]:not(:first-child):not(:last-child) {
        display: none;
      }
    `,
  ],
})
export class HeaderActionsComponent implements AfterContentInit {
  @ContentChildren(ButtonComponent) private buttons: QueryList<ButtonComponent>;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    const isInToolbar = this.elementRef.nativeElement.closest('ion-toolbar');
    if (isInToolbar) {
      this.isCondensed = true;
      this.visibleActions = 2;
    } else {
      const emphasizeActions = !!this.elementRef.nativeElement.closest('.actions.emphasize');
      if (this.visibleActions === undefined && !emphasizeActions) {
        // Setting default visible actions to 2:
        this.visibleActions = 2;
      }
    }
  }

  public set isCondensed(value: boolean) {
    this.buttons.forEach((button) => (button.showIconOnly = value));
  }

  @Input() visibleActions?: number;
  @Input() emphasizeActions?: boolean;

  @HostBinding('class.visible-actions')
  public get _hasMaxVisibleActions() {
    return this.visibleActions > 0;
  }
}

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
export class HeaderComponent implements OnChanges {
  @HostBinding('class.centered')
  @Input()
  centered = false;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.titleMaxLines) {
      this.fitHeadingConfig = {
        ...this.fitHeadingConfig,
        maxLines: changes.titleMaxLines.currentValue,
      };
    }
  }
}
