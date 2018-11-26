import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointHelperService {
  currentScreenWidth: 800;

  constructor() { }

  onInit(callback: () => void) {
  }
}
