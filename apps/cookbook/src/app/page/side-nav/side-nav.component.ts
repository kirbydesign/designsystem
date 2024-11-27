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
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { kebabToTitleCase } from '@kirbydesign/designsystem';

import { routes } from '../../showcase/showcase.routes';

const KEY_DOWN = 'ArrowDown';

interface SideNavLink {
  path?: string;
  externalUrl?: string;
  name: string;
}

@Component({
  selector: 'cookbook-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private allShowcaseRoutes: SideNavLink[];
  filteredShowcaseRoutes: SideNavLink[][];
  filter: string = '';

  @Output() menuToggle = new EventEmitter<boolean>();
  @HostBinding('class.is-open')
  @Input()
  isMenuOpen = false;

  constructor(private router: Router) {}

  navigationItems: SideNavLink[] = [
    { name: 'Introduction', path: '/home/intro' },
    {
      name: 'Components',
      path: '/home/component-overview',
    },
    { name: 'Guides', path: '/home/guides' },
    {
      name: 'Accessibility',
      path: '/home/accessibility-in-kirby',
    },
    {
      name: 'Extensions',
      path: '/home/extensions',
    },
    {
      name: 'Changelog',
      externalUrl: 'https://github.com/kirbydesign/designsystem/releases',
    },
    { name: 'GitHub', externalUrl: 'https://github.com/kirbydesign/designsystem' },
  ];
  ngOnInit() {
    this.mapRoutes();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (!event.urlAfterRedirects.includes('/showcase/')) {
          this.applyComponentFilter('');
        }
      });
  }

  private mapRoutes() {
    const routesWithPath = routes[0].children.filter((r) => r.path);
    const navigableRoutes = routesWithPath.filter((r) => !r.data?.hide);
    navigableRoutes.sort(this.sortByPath);

    this.allShowcaseRoutes = navigableRoutes.map((route) => {
      return {
        path: `showcase/${route.path}`,
        name: kebabToTitleCase(route.path),
        active: this.router.url.endsWith(route.path),
      };
    });

    this.applyComponentFilter('');
  }

  private sortByPath(a: Route, b: Route): number {
    return a.path < b.path ? -1 : a.path > b.path ? 1 : 0;
  }

  @ViewChildren('componentLink') componentLinks: QueryList<ElementRef<HTMLAnchorElement>>;

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

  onLinksArrowUpDown(event: KeyboardEvent) {
    event.preventDefault();
    const listElements: HTMLAnchorElement[] = this.componentLinks.map((link) => link.nativeElement);
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

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get menuIcon(): string {
    return this.isMenuOpen ? 'close' : 'more';
  }

  private applyComponentFilter(stringToMatch: string): void {
    this.filter = stringToMatch;
    let filteredLinks: SideNavLink[] = this.allShowcaseRoutes;

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
