import { Component } from '@angular/core';
import { HeaderModule } from '@kirbydesign/designsystem/header';

const config = {
  selector: 'cookbook-header-example-title-scaling',
  template: `<kirby-header titleMaxLines="2" [title]="'Fall prices consulting quarterly municipal appeal inverse expenses market value credit quality market exposure potential appeal funds debt downturn NASDAQ Fitch 401k appeal corporate bonds municipal Nikkei market index treasury lucrative holder fiat corporation funds default interest rollover 401k exchange traded funds dividends inverse credit investment capitalization'" subtitle1="Subtitle one" subtitle2="Subtitle two">
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [HeaderModule],
})
export class HeaderExampleTitleScalingComponent {
  template: string = config.template;
}
