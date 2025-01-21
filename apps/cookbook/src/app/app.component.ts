import { Component } from '@angular/core';
import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cookbook-root',
  templateUrl: './app.component.html',
  imports: [KirbyAppModule, RouterOutlet],
})
export class AppComponent {
  title = 'Kirby design system';
}
