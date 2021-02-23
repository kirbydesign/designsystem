import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { routes } from '../../showcase/showcase.routes';

interface ISideNavLink {
  path: string;
  name: string;
}

@Component({
  selector: 'cookbook-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private _showcaseRoutes: ISideNavLink[];
  filter: string = '';

  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() isMenuOpen = false;

  constructor() {}

  ngOnInit() {
    this.mapRoutes();
  }

  private mapRoutes() {
    const routesWithPath = routes[0].children.filter((r) => r.path);
    routesWithPath.sort((a, b) => {
      return a.path < b.path ? -1 : a.path > b.path ? 1 : 0;
    });
    this._showcaseRoutes = routesWithPath.map((route) => {
      return {
        path: `showcase/${route.path}`,
        name: this.convertKebabToTitleCase(route.path),
      };
    });
  }

  onFilterChange(event) {
    this.filter = event;
  }

  onClear() {
    this.filter = '';
  }

  get showcaseRoutes(): ISideNavLink[] {
    return this.filterComponents();
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

  private filterComponents(): ISideNavLink[] {
    if (this.filter.length === 0) {
      return this._showcaseRoutes;
    }
    const caseSensitive = this.filter[0].toUpperCase() === this.filter[0];
    const casedFilter = caseSensitive ? this.filter : this.filter.toLowerCase();

    const filteredList = this._showcaseRoutes.filter((link) => {
      const casedLinkName = caseSensitive ? link.name : link.name.toLowerCase();
      return casedLinkName.indexOf(casedFilter) > -1;
    });

    return filteredList;
  }
}
