import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cookbook-example-configuration-wrapper',
  templateUrl: './example-configuration-wrapper.component.html',
  styleUrls: ['./example-configuration-wrapper.component.scss'],
})
export class ExampleConfigurationWrapperComponent {
  @HostBinding('class.snap-to-viewport')
  @Input()
  snapToViewport = false;
}
