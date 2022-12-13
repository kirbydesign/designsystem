import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { EmitterType } from './emitterType';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {
  public componentInit = new EmitterType();
  public componentDestroyed = new EmitterType();

  constructor() {}
}
