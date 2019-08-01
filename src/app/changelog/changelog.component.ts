import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { ChangelogService } from '~/app/changelog/changelog.service';

@Component({
  selector: 'kirby-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit, OnDestroy {
  changelogSubscription: Subscription;
  changelog: any[];

  getBadgeStyle(color) {
    if (this.lightOrDark(color) === 'dark') {
      return this.sanitizer.bypassSecurityTrustStyle(
        `--kirby-badge-background-color: #${color}; --kirby-badge-color: #fff`
      );
    } else {
      return this.sanitizer.bypassSecurityTrustStyle(`--kirby-badge-background-color: #${color}`);
    }
  }

  constructor(private changelogService: ChangelogService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.changelogService.updateChangelog();

    this.changelogService.changelog$.subscribe((changelog) => {
      this.changelog = changelog;
    });
  }

  ngOnDestroy(): void {
    this.changelogSubscription.unsubscribe();
  }

  onRefreshVersion(version) {
    this.changelogService.updateChangelog(version.name, version.name);
  }

  trackByFn(index, item) {
    return item.name;
  }

  lightOrDark(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }
}
