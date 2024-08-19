import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'cookbook-example-configuration-wrapper',
  imports: [CommonModule, ButtonComponent, CardModule, IconModule],
  templateUrl: './example-configuration-wrapper.component.html',
  styleUrls: ['./example-configuration-wrapper.component.scss'],
  standalone: true,
})
export class ExampleConfigurationWrapperComponent {
  @Input()
  configAppearance: 'block' | 'snap-to-viewport' | 'toggle' = 'block';

  @Input() title: string = 'Configuration';

  @HostBinding('class.show-config')
  showConfig: boolean = false;

  @Input()
  align: 'start' | 'end' = 'end';

  @HostBinding('class')
  get _cssClass() {
    return ['align-' + this.align, this.configAppearance].filter(Boolean);
  }

  toggleConfig() {
    this.showConfig = !this.showConfig;
  }
}
