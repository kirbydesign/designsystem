import { Component } from '@angular/core';
import { EmitterService } from '../emitter.service';
import { PageImplementerComponent } from '../pageImplementer/pageImplementer.component';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css'],
})
export class TwoComponent extends PageImplementerComponent {
  constructor(emitterService: EmitterService) {
    super('two', emitterService);
  }
}
