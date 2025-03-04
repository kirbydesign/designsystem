import { Component } from '@angular/core';

import { KirbyAppModule } from '@kirbydesign/designsystem/kirby-app';
import { RouterOutletModule } from '@kirbydesign/designsystem/router-outlet';

@Component({
  selector: 'cookbook-toast-example',
  templateUrl: './toast-example.component.html',
  imports: [KirbyAppModule, RouterOutletModule],
})
export class ToastExampleComponent {}
