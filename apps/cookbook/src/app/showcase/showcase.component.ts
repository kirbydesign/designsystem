import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  propertiesTable: Element;
  private routerEventsSubscription: Subscription;
  private gitUrl =
    'https://github.com/kirbydesign/designsystem/tree/master/apps/cookbook/src/app/examples/';
  areCTAlinkShown = true;

  constructor(private router: Router) {
    this.onNavigationEnd();
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  onPropertiesClick(event) {
    event.preventDefault();
    this.propertiesTable.scrollIntoView();
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
    this.areCTAlinkShown = this.exampleComponentName !== 'colors';
    window.setTimeout(() => {
      this.propertiesTable = document.getElementsByClassName('cookbook-properties')[0];
    }, 1); // this queues the query to ensure DOM has been rendered
  }

  private getExampleComponentUrlSegment(url: string) {
    const urlSegments = url.split('/');
    let exampleComponentUrlSegment = urlSegments.pop();
    if (exampleComponentUrlSegment && exampleComponentUrlSegment.startsWith('(modal:')) {
      exampleComponentUrlSegment = urlSegments.pop();
    }
    return exampleComponentUrlSegment;
  }

  private replaceHyphens(name: string) {
    return name && name.split('-').join(' ');
  }
}
