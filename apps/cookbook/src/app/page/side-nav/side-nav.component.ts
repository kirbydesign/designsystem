import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { kebabToTitleCase } from '@kirbydesign/designsystem';

import { routes } from '../../showcase/showcase.routes';
import { navigationItems } from '../header/header.component';

const KEY_DOWN = 'ArrowDown';

interface SideNavLink {
  path: string;
  name: string;
  active: boolean;
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
  @Input() isMenuOpen = false;

  constructor(private router: Router) {}

  navigationLinks = navigationItems;

  ngOnInit() {
    this.mapRoutes();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((val) => {
        if (!val.urlAfterRedirects.includes('/showcase/')) {
          this.applyComponentFilter('');
        }
      });
  }

  private mapRoutes() {
    const routesWithPath = routes[0].children.filter((r) => r.path);
    routesWithPath.sort((a, b) => this.sortByPath(a.path, b.path));

    this.allShowcaseRoutes = routesWithPath.map((route) => {
      return {
        path: `showcase/${route.path}`,
        name: kebabToTitleCase(route.path),
        active: this.router.url.endsWith(route.path),
      };
    });

    this.applyComponentFilter('');
  }

  private sortByPath(aPath: string, bPath: string): number {
    return aPath < bPath ? -1 : aPath > bPath ? 1 : 0;
  }

  @ViewChildren('componentLink') componentLinks: QueryList<ElementRef<HTMLAnchorElement>>;

  onFilterChange(value: string) {
    this.applyComponentFilter(value);
  }

  onFilterKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const links = this.componentLinks.toArray();

    for (let i = 0; i < links.length; i++) {
      links[i].nativeElement.focus();
      break;
    }
  }

  onLinksKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const listElements: HTMLAnchorElement[] = this.componentLinks.map((link) => {
      return link.nativeElement;
    });

    const currentlyFocused = listElements.findIndex((link) => {
      return link === document.activeElement;
    });

    if (currentlyFocused === -1) {
      return;
    }

    if (event.key === KEY_DOWN) {
      listElements[Math.min(currentlyFocused + 1, listElements.length - 1)].focus();
    } else {
      listElements[Math.max(currentlyFocused - 1, 0)].focus();
    }
  }

  onComponentLinkClick(path: string) {
    this.setRouteActive(path);
    this.onToggleMenu();
  }

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }

  private applyComponentFilter(stringToMatch: string): void {
    this.filter = stringToMatch;
    let filteredLinks: SideNavLink[] = this.allShowcaseRoutes;

    if (this.filter.length > 0) {
      const caseSensitive = this.filter[0].toUpperCase() === this.filter[0];
      const casedFilter = caseSensitive ? this.filter : this.filter.toLowerCase();

      filteredLinks = filteredLinks.filter((link) => {
        const casedLinkName = caseSensitive ? link.name : link.name.toLowerCase();
        return casedLinkName.includes(casedFilter);
      });
    }

    this.filteredShowcaseRoutes = this.distributeSideNavLinksAlphabetically(filteredLinks);
  }

  private distributeSideNavLinksAlphabetically(links: SideNavLink[]): SideNavLink[][] {
    const distributed: { [key: string]: SideNavLink[] } = links.reduce((acc, link) => {
      const firstLetter = link.name[0];
      link.active = this.router.url.endsWith(link.path);
      acc[firstLetter] = acc[firstLetter] === undefined ? [link] : [...acc[firstLetter], link];
      return acc;
    }, {});

    return Object.keys(distributed).map((groupKey) => {
      return distributed[groupKey];
    });
  }

  private setRouteActive(path) {
    this.filteredShowcaseRoutes = this.filteredShowcaseRoutes.map((group) => {
      return group.map((link) => {
        return { ...link, active: link.path === path };
      });
    });
  }
}
