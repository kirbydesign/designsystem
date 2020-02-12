import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { ChangelogService } from '~/app/changelog/changelog.service';
import { ColorService } from '~/app/shared/color/color.service';
import { ChangelogVersion } from '~/app/changelog/changelog.interfaces';

@Component({
  selector: 'kirby-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit, OnDestroy {
  changelogSubscription: Subscription;
  changelog: any[];

  getBadgeStyle(color) {
    if (this.colorService.lightOrDark(color) === 'dark') {
      return this.sanitizer.bypassSecurityTrustStyle(
        `--kirby-badge-background-color: #${color}; --kirby-badge-color: #fff`
      );
    } else {
      return this.sanitizer.bypassSecurityTrustStyle(`--kirby-badge-background-color: #${color}`);
    }
  }

  constructor(
    private changelogService: ChangelogService,
    private colorService: ColorService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.changelogService.updateChangelog();

    this.changelogSubscription = this.changelogService.changelog$.subscribe(
      (changelog: ChangelogVersion[]) => {
        this.changelog = changelog;
      }
    );
  }

  ngOnDestroy(): void {
    this.changelogSubscription.unsubscribe();
  }

  onRefreshVersion(version: ChangelogVersion) {
    this.changelogService.updateChangelog(version.name, version.name);
  }

  trackByFn(index: number, item: ChangelogVersion) {
    return item.name;
  }
}
