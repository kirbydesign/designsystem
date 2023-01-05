import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cookbook-component-display',
  templateUrl: './component-display.component.html',
  styleUrls: ['./component-display.component.scss'],
})
export class ComponentDisplayComponent {
  constructor(private _router: Router) {}

  @Input() title: string;
  @Input() paragraph: string;
  @Input() svgPath: string;
  @Input() route: string;

  navigate(path: string) {
    this._router.navigate([path]);
  }
}
