import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

export class EmitterType {
  private emitter$: Subject<string>;
  private $emitter: Observable<string>;

  public listen = () => this.$emitter;
  public emit = (text: string) => this.emitter$.next(text);

  constructor() {
    this.emitter$ = new Subject();
    this.$emitter = this.emitter$.asObservable();
  }
}
