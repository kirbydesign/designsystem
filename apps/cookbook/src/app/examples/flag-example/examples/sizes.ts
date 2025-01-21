import { Component } from '@angular/core';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

const config = {
  selector: 'cookbook-flag-example-sizes',
  template: `<kirby-flag size="xs">Extra Small (xs)</kirby-flag>
<kirby-flag size="sm">Small (sm)</kirby-flag>
<kirby-flag size="md" title="(default)">Medium (md)</kirby-flag>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./flag-examples.shared.scss'],
  imports: [FlagComponent],
})
export class FlagExampleSizesComponent {
  template: string = config.template;
}
