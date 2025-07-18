import { Component } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  selector: 'cookbook-kirby-christmas',
  templateUrl: './kirby-christmas.component.html',
  styleUrls: ['./kirby-christmas.component.scss'],
  imports: [ButtonComponent],
})
export class KirbyChristmasComponent {
  kirbyChristmas: boolean = true;

  turnOffKirbyChristmas() {
    this.kirbyChristmas = false;
  }
}
