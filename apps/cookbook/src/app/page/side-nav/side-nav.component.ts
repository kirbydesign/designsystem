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
const HIDDEN_CLASS = 'is-hidden';

interface SideNavLink {
  path: string;
  name: string;
  active: boolean;
  hidden: boolean;
}

@Component({
  selector: 'cookbook-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private allShowcaseRoutes: SideNavLink[];
  filteredShowcaseRoutes: SideNavLink[];
  filter: string = '';

  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() isMenuOpen = false;

  constructor(private router: Router) {}

  navigationLinks = navigationItems;

  ngOnInit() {
    this.mapRoutes();
    this.filteredShowcaseRoutes = this.allShowcaseRoutes;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((val) => {
        if (val.urlAfterRedirects.indexOf('/showcase/') === -1) {
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
        active: this.router.url.indexOf(route.path) > -1,
        hidden: false,
      };
    });
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
      const element = links[i].nativeElement;
      if (!element.classList.contains(HIDDEN_CLASS)) {
        element.focus();
        break;
      }
    }
  }

  onLinksKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const listElements: HTMLAnchorElement[] = this.componentLinks.map((link) => {
      return link.nativeElement;
    });
    const visibleLinks = listElements.filter((link) => {
      return !link.classList.contains(HIDDEN_CLASS);
    });
    const currentlyFocused = visibleLinks.findIndex((link) => {
      return link === document.activeElement;
    });
    if (currentlyFocused === -1) {
      return;
    }

    if (event.key === KEY_DOWN) {
      visibleLinks[Math.min(currentlyFocused + 1, visibleLinks.length - 1)].focus();
    } else {
      visibleLinks[Math.max(currentlyFocused - 1, 0)].focus();
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
    if (this.filter.length === 0) {
      this.filteredShowcaseRoutes = this.allShowcaseRoutes.map((link) => {
        return { ...link, hidden: false, active: this.router.url.indexOf(link.path) > -1 };
      });
      return;
    }
    const caseSensitive = this.filter[0].toUpperCase() === this.filter[0];
    const casedFilter = caseSensitive ? this.filter : this.filter.toLowerCase();

    this.filteredShowcaseRoutes = this.allShowcaseRoutes.map((link) => {
      const casedLinkName = caseSensitive ? link.name : link.name.toLowerCase();
      return {
        ...link,
        hidden: casedLinkName.indexOf(casedFilter) === -1,
        active: this.router.url.indexOf(link.path) > -1,
      };
    });
  }

  private setRouteActive(path) {
    this.filteredShowcaseRoutes = this.filteredShowcaseRoutes.map((route) => {
      return { ...route, active: route.path === path };
    });
  }
}
