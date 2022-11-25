import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cookbook-component-display',
  templateUrl: './component-display.component.html',
  styleUrls: ['./component-display.component.scss'],
})
export class ComponentDisplayComponent {
  constructor(private _router: Router) {}

  @Input() title = 'Title';
  @Input() paragraph = 'Text';
  @Input() svgPath: string = '../../assets/component-svg/Accordion-Kirby-Component-Overview.svg';
  @Input() route: string = 'home/showcase/accordion';

  navigate(path: string) {
    this._router.navigate([path]);
  }
}
