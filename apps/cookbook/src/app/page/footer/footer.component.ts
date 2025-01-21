import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  year: string = new Date(Date.now()).getFullYear().toString();
}
