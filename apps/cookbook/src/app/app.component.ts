import { Component } from '@angular/core';
import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { RouterOutlet } from '@angular/router';
import { IonApp } from '@ionic/angular/standalone';
import { ConfigComponent } from './config/config.component';

@Component({
  selector: 'cookbook-root',
  templateUrl: './app.component.html',
  imports: [KirbyAppModule, RouterOutlet, ConfigComponent, IonApp],
})
export class AppComponent {
  title = 'Kirby design system';
}
