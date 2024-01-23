import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-kirby-christmas',
  templateUrl: './kirby-christmas.component.html',
  styleUrls: ['./kirby-christmas.component.scss'],
})
export class KirbyChristmasComponent {
  kirbyChristmas: boolean = true;

  turnOffKirbyChristmas() {
    this.kirbyChristmas = false;
  }
}
