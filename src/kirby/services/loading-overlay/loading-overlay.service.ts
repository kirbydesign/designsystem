import { Injectable } from '@angular/core';
import { LoadingOverlay } from './loading-overlay.interface';

@Injectable({
  providedIn: 'root'
})
export class LoadingOverlayService implements LoadingOverlay {
  
  constructor() { }
  
  showLoadingOverlay(): void {
    throw new Error("Method not implemented.");
  }
  hideLoadingOverlay(): void {
    throw new Error("Method not implemented.");
  }
}
