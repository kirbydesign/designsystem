import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '~/environments/environment';
import { GitHubCompare, GithubTag } from '~/app/shared/github/github.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  url: string = 'what';
  constructor(private http: HttpClient) {}

  getTags() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
      }),
    };
    const url = environment.githubApi + '/repos/kirbydesign/designsystem/tags';
    return this.http
      .get(url, options)
      .pipe()
      .subscribe((versions: GithubTag[]) => {
        console.log(versions);
        this.compareCommits(versions[2].name, versions[0].name);
      });
  }

  compareCommits(previousVersion, nextVersion) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'token ' + environment.oauth.githubToken1 + environment.oauth.githubToken2,
      }),
    };
    const url = `${
      environment.githubApi
    }/repos/kirbydesign/designsystem/compare/${previousVersion}...${nextVersion}`;
    return this.http
      .get(url, options)
      .pipe()
      .subscribe((x: GitHubCompare) => {
        console.log('commits', x.commits);
      });
  }

  getChangelog() {}
}
