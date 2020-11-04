import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cookbook-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnDestroy {
  exampleComponentName: string;
  exampleComponentPopOutUrl: string[];
  exampleComponentGitUrl: string;
  private routerEventsSubscription: Subscription;
  private gitUrl =
    'https://github.com/kirbydesign/designsystem/tree/master/apps/cookbook/src/app/examples/';
  isCTABoxShown = true;

  constructor(private router: Router) {
    this.onNavigationEnd();
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  private onNavigationEnd() {
    this.routerEventsSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.setExampleComponentFromUrl(event.urlAfterRedirects));
  }

  private setExampleComponentFromUrl(url: string) {
    let exampleComponentUrlSegment = this.getExampleComponentUrlSegment(url);
    this.exampleComponentPopOutUrl = ['/', 'examples', exampleComponentUrlSegment];
    this.exampleComponentGitUrl = this.gitUrl + exampleComponentUrlSegment + '-example';
    this.exampleComponentName = this.replaceHyphens(exampleComponentUrlSegment);
    this.isCTABoxShown = this.exampleComponentName !== 'colors';
  }

  private getExampleComponentUrlSegment(url: string) {
    const urlSegments = url.split('/');
    let exampleComponentUrlSegment: string = undefined;
    exampleComponentUrlSegment = urlSegments.pop();
    if (exampleComponentUrlSegment && exampleComponentUrlSegment.startsWith('(modal:')) {
      exampleComponentUrlSegment = urlSegments.pop();
    }
    return exampleComponentUrlSegment;
  }

  private replaceHyphens(name: string) {
    return name && name.split('-').join(' ');
  }
}
