import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyService {
  private verifyStatusSource = new Subject<boolean>();
  verifyStatus$ = this.verifyStatusSource.asObservable();

  public setVerifyStatus(verify: boolean) {
    this.verifyStatusSource.next(verify);
  }

  public getVerifyStatus$(): Observable<boolean> {
    return this.verifyStatusSource.asObservable();
  }
}
