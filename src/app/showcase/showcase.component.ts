import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private routerEventsSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
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
  }

}
