import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointHelperService implements OnDestroy {
  currentScreenWidth: 800;
  private orientationChangedSubject = new Subject<void>();

  constructor() {
    this.init();
  }

  private init() {
    // TODO JEO: Implement Angular/CDK BreakpointObserver:
    this.orientationChangedSubject.next();
  }

  observe(): Observable<void> {
    return this.orientationChangedSubject.asObservable();
  }

  ngOnDestroy() {
    this.orientationChangedSubject.complete();
  }
}
