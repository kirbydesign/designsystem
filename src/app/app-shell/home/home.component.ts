import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMenuOpen = false;

  constructor() {}

  ngOnInit() {}

  onMenuClick() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('onClickMenu kaldt: ' + this.isMenuOpen);
  }

  onMenuToggle(isOpen: boolean) {
    console.log('Toggled kaldt...i home component');
    this.isMenuOpen = isOpen;
  }
}
