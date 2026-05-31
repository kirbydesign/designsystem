import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

import { kebabToTitleCase } from '@kirbydesign/designsystem';

import { CardModule } from '@kirbydesign/designsystem/card';

import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { routes as appRoutes } from '../../app.routes';
import {
  COMPONENT_ROUTES as componentRoutes,
  FOUNDATION_ROUTES as foundationRoutes,
  LAYOUT_ROUTES as layoutRoutes,
} from '../../showcase/showcase.routes';

const KEY_DOWN = 'ArrowDown';

interface SideNavLink {
  path: string;
  name: string;
}

@Component({
  selector: 'cookbook-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  imports: [
    CardModule,
    RouterLink,
    FormFieldModule,
    DateInputDirective,
    InputComponent,
    FormsModule,
    ButtonComponent,
    IconModule,
    RouterLinkActive,
  ],
})
export class SideNavComponent implements OnInit {
  private allComponentShowcaseRoutes: SideNavLink[];
  filteredShowcaseRoutes: SideNavLink[][];
  filteredResourceRoutes: Route[];
  foundationRoutes: SideNavLink[];
  layoutRoutes: SideNavLink[];
  filter: string = '';

  @ViewChildren('componentLink') componentLinks!: QueryList<ElementRef<HTMLAnchorElement>>;
  @ViewChildren('resourceLink') resourceLinks!: QueryList<ElementRef<HTMLAnchorElement>>;
  @ViewChildren('foundationLink') foundationLinks!: QueryList<ElementRef<HTMLAnchorElement>>;
  @ViewChildren('layoutLink') layoutLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

  @Output() menuToggle = new EventEmitter<boolean>();
  @HostBinding('class.is-open')
  @Input()
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.foundationRoutes = this.mapRouteGroup(foundationRoutes);
    this.layoutRoutes = this.mapRouteGroup(layoutRoutes);
    this.allComponentShowcaseRoutes = this.mapRouteGroup(componentRoutes);
    this.applyComponentFilter('');
    this.mapResourcesRoutes();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (!event.urlAfterRedirects.includes('/showcase/')) {
          this.applyComponentFilter('');
        }
      });
  }

  private mapRouteGroup(routes: Route[]): SideNavLink[] {
    const navigable = routes.filter((r) => r.path && !r.data?.hide);
    navigable.sort(this.sortByPath);
    return navigable.map((route) => ({
      path: `showcase/${route.path}`,
      name: kebabToTitleCase(route.path),
      active: this.router.url.endsWith(route.path),
    }));
  }

  private mapResourcesRoutes() {
    const routesWithPath = appRoutes.find((r) => r.path === 'home')?.children || [];
    const resourceLinks = routesWithPath.filter((r) => r.data?.['resourceLink']);

    this.filteredResourceRoutes = resourceLinks;
  }

  private sortByPath(a: Route, b: Route): number {
    return a.path < b.path ? -1 : a.path > b.path ? 1 : 0;
  }

  onFilterChange(value: string) {
    this.applyComponentFilter(value);
  }

  onFilterArrowDown(event: KeyboardEvent) {
    event.preventDefault();
    const firstLink = this.componentLinks.first;
    if (firstLink) {
      firstLink.nativeElement.focus();
    }
  }

  onLinksArrowUpDown(event: KeyboardEvent, sideNavGroupKey: string) {
    event.preventDefault();
    let links: QueryList<ElementRef<HTMLAnchorElement>>;
    switch (sideNavGroupKey) {
      case 'foundation':
        links = this.foundationLinks;
        break;
      case 'layout':
        links = this.layoutLinks;
        break;
      case 'components':
        links = this.componentLinks;
        break;
      default:
        links = this.resourceLinks;
        break;
    }
    const listElements: HTMLAnchorElement[] = links.map((link) => link.nativeElement);
    const currentlyFocused = listElements.findIndex((link) => link === document.activeElement);

    if (currentlyFocused === -1) {
      return;
    }

    const linkToFocus =
      event.key === KEY_DOWN
        ? listElements[Math.min(currentlyFocused + 1, listElements.length - 1)]
        : listElements[Math.max(currentlyFocused - 1, 0)];
    linkToFocus.focus();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.menuToggle.emit(this.isMenuOpen);
  }

  private applyComponentFilter(stringToMatch: string): void {
    this.filter = stringToMatch;
    let filteredLinks: SideNavLink[] = this.allComponentShowcaseRoutes;

    if (stringToMatch.length > 0) {
      const caseSensitive = stringToMatch[0].toUpperCase() === stringToMatch[0];
      const casedFilter = caseSensitive ? stringToMatch : stringToMatch.toLowerCase();

      filteredLinks = filteredLinks.filter((link) => {
        const casedLinkName = caseSensitive ? link.name : link.name.toLowerCase();
        return casedLinkName.includes(casedFilter);
      });
    }

    this.filteredShowcaseRoutes = this.distributeSideNavLinksAlphabetically(filteredLinks);
  }

  private distributeSideNavLinksAlphabetically(links: SideNavLink[]): SideNavLink[][] {
    const distributed: { [key: string]: SideNavLink[] } = links.reduce((accumulator, link) => {
      const firstLetter = link.name[0];
      accumulator[firstLetter] =
        accumulator[firstLetter] === undefined ? [link] : [...accumulator[firstLetter], link];
      return accumulator;
    }, {});

    return Object.keys(distributed).map((groupKey) => distributed[groupKey]);
  }
}
