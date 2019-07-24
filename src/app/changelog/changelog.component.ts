import { Component, OnInit } from '@angular/core';

import { GithubService } from '~/app/shared/github/github.service';

@Component({
  selector: 'kirby-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit {
  constructor(private github: GithubService) {}

  ngOnInit(): void {
    console.log(this.github);
    this.github.getTags();
  }
}
