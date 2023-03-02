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
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

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

  @Input() title = null;
  @Input() value = null;
  @Input() valueUnit = null;
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
