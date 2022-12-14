import { Injectable } from '@angular/core';
import { interval, tap, timer } from 'rxjs';

import { EmitterType } from './emitterType';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {
  public componentInit = new EmitterType();
  public componentDestroyed = new EmitterType();
  public emitJokes = new EmitterType();

  constructor() {
    console.log('heyo');
    const num = interval(3 * 1000);
    num
      .pipe(
        tap((_) => {
          this.emitJokes.emit(`**Service returning** ${Math.random()}`);
        })
      )
      .subscribe();
  }
}
