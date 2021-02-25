import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { routes } from '../../showcase/showcase.routes';
import { navigationItems } from '../header/header.component';

const KEY_DOWN = 'ArrowDown';
const KEY_UP = 'ArrowUp';

interface ISideNavLink {
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
  private allShowcaseRoutes: ISideNavLink[];
  private filteredShowcaseRoutes: ISideNavLink[];
  filter: string = '';

  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() isMenuOpen = false;

  constructor(private router: Router) {}

  navigationLinks = navigationItems;

  ngOnInit() {
    this.mapRoutes();
    this.filteredShowcaseRoutes = this.allShowcaseRoutes;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url.indexOf('showcase') === -1) {
          // reset component links
          this.filterComponents();
        }
      }
    });
  }

  private mapRoutes() {
    const routesWithPath = routes[0].children.filter((r) => r.path);
    routesWithPath.sort((a, b) => {
      return a.path < b.path ? -1 : a.path > b.path ? 1 : 0;
    });
    this.allShowcaseRoutes = routesWithPath.map((route) => {
      return {
        path: `showcase/${route.path}`,
        name: this.convertKebabToTitleCase(route.path),
        active: this.router.url.indexOf(route.path) > -1,
        hidden: false,
      };
    });
  }

  @ViewChildren('componentLink') componentLinks: QueryList<any>;

  onFilterChange(event) {
    this.filter = event;
    this.filterComponents();
  }

  onFilterKeyDown(event: KeyboardEvent) {
    if (event.key === KEY_DOWN) {
      event.preventDefault();
      const links = this.componentLinks.toArray();
      for (let i = 0; i < links.length; i++) {
        const element = links[i].nativeElement;
        if (!element.classList.contains('hidden')) {
          element.focus();
          break;
        }
      }
    }
  }

  onLinksKeyDown(event: KeyboardEvent) {
    if (event.key === KEY_DOWN || event.key === KEY_UP) {
      event.preventDefault();
    } else {
      return;
    }

    const visibleLinks = this.componentLinks.filter((link) => {
      return !link.nativeElement.classList.contains('hidden');
    });
    const currentlyFocused = visibleLinks.findIndex((link) => {
      return link.nativeElement === document.activeElement;
    });
    if (currentlyFocused === -1) {
      return;
    }

    if (event.key === KEY_DOWN) {
      visibleLinks[Math.min(currentlyFocused + 1, visibleLinks.length - 1)].nativeElement.focus();
    } else {
      visibleLinks[Math.max(currentlyFocused - 1, 0)].nativeElement.focus();
    }
  }

  onComponentClick(event) {
    this.setRouteActive(event.path);
  }

  get showcaseRoutes(): ISideNavLink[] {
    return this.filteredShowcaseRoutes;
  }

  onToggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }

  private convertKebabToTitleCase(kebab) {
    const words = kebab.split('-');
    const titleWords = words.map((word: string) => {
      return word[0].toUpperCase() + word.slice(1);
    });

    return titleWords.join(' ');
  }

  private filterComponents(): void {
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
