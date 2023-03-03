import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import type { FitHeadingConfig } from '@kirbydesign/designsystem/shared';

@Component({
  selector: 'kirby-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @HostBinding('class.centered')
  @Input()
  centered = false;

  @Input() titleMaxLines: number;

  fitHeadingConfig: FitHeadingConfig;

  @ContentChild(AvatarComponent)
  avatar: AvatarComponent;

  @ContentChild(FlagComponent)
  flag: FlagComponent;

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
