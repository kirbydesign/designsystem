import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cookbook-example-configuration-wrapper',
  templateUrl: './example-configuration-wrapper.component.html',
  styleUrls: ['./example-configuration-wrapper.component.scss'],
})
export class ExampleConfigurationWrapperComponent {
  @HostBinding('class')
  @Input()
  configAppearance: 'block' | 'snap-to-viewport' | 'toggle' = 'block';

  @Input() title: string = 'Configuration';

  @HostBinding('class.show-config')
  showConfig: boolean = false;

  toggleConfig() {
    this.showConfig = !this.showConfig;
  }
}
