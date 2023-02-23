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
export class HeaderAvatarDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderFlag]',
})
export class HeaderFlagDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderTitle]',
})
export class HeaderTitleDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderValue]',
})
export class HeaderValueDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderSubtitle1]',
})
export class HeaderSubtitle1Directive {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderSubtitle2]',
})
export class HeaderSubtitle2Directive {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderCustomSection]',
})
export class HeaderCustomSectionDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[kirbyHeaderActions]',
})
export class HeaderActionsDirective {
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

  @ContentChild(HeaderAvatarDirective)
  avatarTemplate!: HeaderAvatarDirective;
  @ContentChild(HeaderFlagDirective)
  flagTemplate!: HeaderFlagDirective;
  @Input() title = null;
  @ContentChild(HeaderTitleDirective)
  titleTemplate!: HeaderTitleDirective;
  @Input() value = null;
  @ContentChild(HeaderValueDirective)
  valueTemplate!: HeaderValueDirective;

  @Input() subtitle1 = null;
  @ContentChild(HeaderSubtitle1Directive)
  subtitle1Template!: HeaderSubtitle1Directive;
  @Input() subtitle2 = null;
  @ContentChild(HeaderSubtitle2Directive)
  subtitle2Template!: HeaderSubtitle2Directive;
  @ContentChild(HeaderCustomSectionDirective)
  customSectionTemplate!: HeaderCustomSectionDirective;
  @ContentChild(HeaderActionsDirective)
  actionsTemplate!: HeaderActionsDirective;

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log({
      title: this.title,
      value: this.value,
      subtitle1: this.subtitle1,
      subtitle2: this.subtitle2,
    });
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
