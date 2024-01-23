import { Component, ElementRef, OnDestroy } from '@angular/core';
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
    'https://github.com/kirbydesign/designsystem/tree/develop/apps/cookbook/src/app/examples/';
  showCallToActionLinks = true;

  constructor(private router: Router, private elementRef: ElementRef<HTMLElement>) {
    this.setExampleComponentFromUrl(this.router.url);
    this.onNavigationEnd();
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  onPropertiesClick() {
    this.propertiesTable.scrollIntoView({ behavior: 'smooth' });
    return false;
  }

  private onNavigationEnd() {
    this.routerEventsSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.setExampleComponentFromUrl(this.router.url)));
  }

  private setExampleComponentFromUrl(url: string) {
    const exampleComponentUrlSegment = this.getExampleComponentUrlSegment(url);
    this.exampleComponentPopOutUrl = ['/', 'examples', exampleComponentUrlSegment];
    this.exampleComponentGitUrl = this.gitUrl + exampleComponentUrlSegment + '-example';
    this.exampleComponentName = this.replaceHyphens(exampleComponentUrlSegment);
    this.showCallToActionLinks = this.exampleComponentName !== 'colors';
    this.propertiesTable =
      this.elementRef.nativeElement.getElementsByClassName('api-description')[0];
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
