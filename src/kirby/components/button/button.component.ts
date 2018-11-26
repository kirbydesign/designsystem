import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() shape?: 'round';
  @Input() expand?: 'full' | 'block';
  @Input() colortype?: 'primary' | 'secondary';

  constructor() { }

  ngOnInit() {
  }

}
