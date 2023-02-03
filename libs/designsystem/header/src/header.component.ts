import {
  Component,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/page';

@Directive({
  selector: '[kirbyHeaderAvatar]',
})
export class KirbyHeaderAvatarDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderFlag]',
})
export class KirbyHeaderFlagDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderTitle]',
})
export class KirbyHeaderTitleDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderValue]',
})
export class KirbyHeaderValueDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderSubtitle1]',
})
export class KirbyHeaderSubtitle1Directive {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderSubtitle2]',
})
export class KirbyHeaderSubtitle2Directive {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderCustomSection]',
})
export class KirbyHeaderCustomSectionDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderActions]',
})
export class KirbyHeaderActionsDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() centered = false;
  @Input() titleMaxLines: number;

  isDesktop = true;
  fitHeadingConfig: FitHeadingConfig;

  @ContentChild(KirbyHeaderAvatarDirective)
  avatarTemplate!: KirbyHeaderAvatarDirective;
  @ContentChild(KirbyHeaderFlagDirective)
  flagTemplate!: KirbyHeaderFlagDirective;
  @ContentChild(KirbyHeaderTitleDirective)
  titleTemplate!: KirbyHeaderTitleDirective;
  @ContentChild(KirbyHeaderValueDirective)
  valueTemplate!: KirbyHeaderValueDirective;
  @ContentChild(KirbyHeaderSubtitle1Directive)
  subtitle1Template!: KirbyHeaderSubtitle1Directive;
  @ContentChild(KirbyHeaderSubtitle2Directive)
  subtitle2Template!: KirbyHeaderSubtitle2Directive;
  @ContentChild(KirbyHeaderCustomSectionDirective)
  customSectionTemplate!: KirbyHeaderCustomSectionDirective;
  @ContentChild(KirbyHeaderActionsDirective)
  actionsTemplate!: KirbyHeaderActionsDirective;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(min-width: 768px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.titleMaxLines) {
      this.fitHeadingConfig = {
        ...this.fitHeadingConfig,
        maxLines: changes.titleMaxLines.currentValue,
      };
    }
  }
}
