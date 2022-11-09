import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextAndDateService {
  private textSource = new Subject<string>();
  Text$ = this.textSource.asObservable();

  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  private dateSource = new Subject<string>();
  date$ = this.dateSource.asObservable();

  public setText(text: string) {
    this.textSource.next(text);
  }

  public setMessage(message: string) {
    this.messageSource.next(message);
  }

  public setDate(date: string) {
    this.dateSource.next(date);
  }

  public getText$(): Observable<string> {
    return this.textSource.asObservable();
  }

  public getMessage$(): Observable<string> {
    return this.messageSource.asObservable();
  }

  public getDate$(): Observable<string> {
    return this.dateSource.asObservable();
  }
}
