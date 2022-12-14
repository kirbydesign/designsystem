import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css'],
})
export class TwoComponent implements OnInit, OnDestroy {
  protected $destroy = new Subject<void>();
  val: string;

  constructor(private emitterService: EmitterService) {
    this.listenForMessage();
  }

  ionViewWillEnter = () => console.log('two - ViewWillEnter');
  ionViewDidEnter = () => console.log('two - ionViewDidEnter');

  ionViewWillLeave = () => console.log('Two - ViewWillLeave');
  ionViewDidLeave = () => console.log('two - ionViewDidLeave');

  ngOnInit(): void {
    console.log(`Two component OnInit`);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    console.log(`Two component destroyed`);
  }

  public enterMessage = () => {
    console.log(`Two component enter`);
  };

  public leaveMessage = () => {
    console.log(`Two component leave`);
  };

  private listenForMessage() {
    this.emitterService.emitJokes.$emitter.pipe(takeUntil(this.$destroy)).subscribe((val) => {
      console.log('Two', val);
      this.val = val;
    });
  }
}
