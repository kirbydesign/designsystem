import { Component } from '@angular/core';
import { AppComponent } from '@kirbydesign/designsystem/kirby-app';
import { RouterOutletComponent } from '@kirbydesign/designsystem/router-outlet';

@Component({
  selector: 'cookbook-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
  imports: [AppComponent, RouterOutletComponent],
})
export class ListExampleComponent {}
