import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem-repro/config';
import 'zone.js';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideKirby(withGlobalSetup()), provideAnimations(), provideRouter([])],
}).catch((err) => console.error(err));
