import { Component } from '@angular/core';
import { EmitterService } from '../emitter.service';
import { PageImplementerComponent } from '../pageImplementer/pageImplementer.component';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css'],
})
export class OneComponent extends PageImplementerComponent {
  constructor(emitterService: EmitterService) {
    super('one', emitterService);
  }
}
