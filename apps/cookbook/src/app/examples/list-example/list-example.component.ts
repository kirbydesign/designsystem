import { Component } from '@angular/core';
import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { RouterOutletModule } from '@kirbydesign/designsystem/router-outlet';

@Component({
  selector: 'cookbook-list-example',
  templateUrl: './list-example.component.html',
  styleUrls: ['./list-example.component.scss'],
  imports: [KirbyAppModule, RouterOutletModule],
})
export class ListExampleComponent {}
