import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'kirby-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent {
  @Input()
  @HostBinding('class.padding')
  hasPadding: boolean = true;
}
