import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css'],
})
export class OneComponent implements OnInit, OnDestroy {
  protected $destroy = new Subject<void>();
  val: string;

  constructor(private emitterService: EmitterService) {
    this.listenForMessage();
  }

  ngOnInit(): void {
    console.log(`One component OnInit`);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    console.log(`One component destroyed`);
  }

  public enterMessage = () => {
    console.log(`One component enter`);
    // this.listenForMessage();
  };

  public leaveMessage = () => {
    console.log(`One component leave`);

    // this.$destroy.next();
    // this.$destroy.complete;
  };

  private listenForMessage() {
    this.emitterService.emitJokes.$emitter.pipe(takeUntil(this.$destroy)).subscribe((val) => {
      console.log('One', val);
      this.val = val;
    });
  }
}
