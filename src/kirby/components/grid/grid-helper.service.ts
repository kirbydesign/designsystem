import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridHelperService {
  currentScreenWidth: 800;

  constructor() { }

  onInit(callback: () => void) {
  }
}
