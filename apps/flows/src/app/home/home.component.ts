import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'flows-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private _router: Router) {}

  navigate(path: string) {
    this._router.navigate([path]);
  }
}
