import {
  Component,
  ContentChild,
  Directive,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/page';

@Directive({
  selector: '[kirbyHeaderCustomTitle]',
})
export class HeaderCustomTitleDirective {}

@Directive({
  selector: '[kirbyHeaderCustomValue]',
})
export class HeaderCustomValueDirective {}

@Directive({
  selector: '[kirbyHeaderCustomSection]',
})
export class HeaderCustomSectionDirective {}

@Directive({
  selector: '[kirbyHeaderActions]',
})
export class HeaderActionsDirective {}

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() centered = false;
  @Input() titleMaxLines: number;

  isDesktop = this.platform.isPhabletOrBigger();
  fitHeadingConfig: FitHeadingConfig;

  @ContentChild(AvatarComponent)
  avatar: AvatarComponent;

  @ContentChild(FlagComponent)
  flag: FlagComponent;

  @ContentChild(HeaderCustomSectionDirective)
  customSection: HeaderCustomSectionDirective;

  @ContentChild(HeaderActionsDirective)
  actions: HeaderActionsDirective;

  @Input() title = null;
  @ContentChild(HeaderCustomTitleDirective)
  customTitle: HeaderCustomTitleDirective;

  @Input() value = null;
  @ContentChild(HeaderCustomValueDirective)
  customValue!: HeaderCustomValueDirective;

  @Input() subtitle1 = null;
  @Input() subtitle2 = null;

  constructor(private platform: PlatformService) {}

  @HostListener('window:resize')
  _onWindowResize() {
    this.isDesktop = this.platform.isPhabletOrBigger();
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
