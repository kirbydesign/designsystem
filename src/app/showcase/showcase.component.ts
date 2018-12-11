import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'kirby-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  exampleComponentName: string;
  exampleComponentGitUrl: string;
  private routerEventsSubscription: Subscription;
  private gitUrl = 'https://github.com/kirbydesign/designsystem/tree/master/src/app/examples/';

  constructor(private router: Router, private route: ActivatedRoute, private cRef: ElementRef) {
    this.subscribeToRouterEvents();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  subscribeToRouterEvents() {
    this.routerEventsSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.handleRouterEvent(event));
  }

  handleRouterEvent(event: NavigationEnd) {
    const urlSegments = event.url.split('/');
    this.exampleComponentName = urlSegments.length
                                ? urlSegments[urlSegments.length - 1]
                                : undefined;
    //this.exampleComponentGitUrl = this.gitUrl + urlSegments.pop() + '-example';
  }

}
