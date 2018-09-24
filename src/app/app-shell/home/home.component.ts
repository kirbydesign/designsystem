import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeIsMenuOpen = false;

  constructor() {}

  ngOnInit() {}

  onClickMenu() {
    this.homeIsMenuOpen = !this.homeIsMenuOpen;
    console.log('onClickMenu kaldt: ' + this.homeIsMenuOpen);
  }

  onMenuToggle(isOpen) {
    console.log('Toggled kaldt...i home component');
    this.homeIsMenuOpen = isOpen;
  }
}
