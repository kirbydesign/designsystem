import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cookbook-example-configuration-wrapper',
  templateUrl: './example-configuration-wrapper.component.html',
  styleUrls: ['./example-configuration-wrapper.component.scss'],
})
export class ExampleConfigurationWrapperComponent {
  @HostBinding('class')
  @Input()
  displayMode: 'none' | 'snap' | 'toggle' = 'none';

  @HostBinding('class.show-config')
  showConfig: boolean = false;

  toggleConfiguration() {
    this.showConfig = !this.showConfig;
  }
}
