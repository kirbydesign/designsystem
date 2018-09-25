import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'kirby-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})

export class AppMenuComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<boolean>();
  @Input() isMenuOpen = false;

  constructor() {}

  ngOnInit() {}

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggled.emit(this.isMenuOpen);
    console.log('Fra app-menu - isMenuOpen: ' + this.isMenuOpen);
  }
}
